/* eslint-disable @typescript-eslint/no-explicit-any */
import { awaitIfAsync, forEachWithBreaks, wait } from './async'
import type { MaybePromise } from './async'
import { excludes } from './data'

/**
 * A functions that returns data with entropy to identify visitor.
 *
 * See https://github.com/fingerprintjs/fingerprintjs/blob/master/contributing.md#how-to-make-an-entropy-source
 * to learn how entropy source works and how to make your own.
 */
export type Source<TOptions, TValue> = (
  options: TOptions
) => MaybePromise<TValue | (() => MaybePromise<TValue>)>

/**
 * Generic dictionary of unknown sources
 */
export type UnknownSources<TOptions> = Record<string, Source<TOptions, unknown>>

/**
 * Converts an entropy source type into the component type
 */
export type SourceValue<TSource extends Source<any, any>> =
  TSource extends Source<any, infer T> ? T : never

/**
 * Result of getting entropy data from a source
 */
export type Component<T> = (
  | {
      value: T
      error?: undefined
    }
  | {
      value?: undefined
      // The property type must by truthy
      // so that an expression like `if (!component.error)` tells TypeScript that `component.value` is defined
      error: Error | { message: unknown }
    }
) & {
  duration: number
}

/**
 * Generic dictionary of unknown components
 */
export type UnknownComponents = Record<string, Component<unknown>>

/**
 * Converts an entropy source list type to a corresponding component list type.
 *
 * Warning for package users:
 * This type is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
export type SourcesToComponents<TSources extends UnknownSources<any>> = {
  [K in keyof TSources]: Component<SourceValue<TSources[K]>>
}

function ensureErrorWithMessage(error: unknown): { message: unknown } {
  return error && typeof error === 'object' && 'message' in error
    ? (error as { message: unknown })
    : { message: error }
}

/**
 * Loads the given entropy source. Returns a function that gets an entropy component from the source.
 *
 * The result is returned synchronously to prevent `loadSources` from
 * waiting for one source to load before getting the components from the other sources.
 */
export function loadSource<TOptions, TValue>(
  source: Source<TOptions, TValue>,
  sourceOptions: TOptions
): () => Promise<Component<TValue>> {
  const isFinalResultLoaded = (
    loadResult: TValue | (() => MaybePromise<TValue>)
  ): loadResult is TValue => {
    return typeof loadResult !== 'function'
  }

  const sourceLoadPromise = new Promise<() => MaybePromise<Component<TValue>>>(
    (resolveLoad) => {
      const loadStartTime = Date.now()

      // `awaitIfAsync` is used instead of just `await` in order to measure the duration of synchronous sources
      // correctly (other microtasks won't affect the duration).
      awaitIfAsync(source.bind(null, sourceOptions), (...loadArgs) => {
        const loadDuration = Date.now() - loadStartTime

        // Source loading failed
        if (!loadArgs[0]) {
          return resolveLoad(() => ({
            error: ensureErrorWithMessage(loadArgs[1]),
            duration: loadDuration,
          }))
        }

        const loadResult = loadArgs[1]

        // Source loaded with the final result
        if (isFinalResultLoaded(loadResult)) {
          return resolveLoad(() => ({
            value: loadResult,
            duration: loadDuration,
          }))
        }

        // Source loaded with "get" stage
        resolveLoad(
          () =>
            new Promise<Component<TValue>>((resolveGet) => {
              const getStartTime = Date.now()

              awaitIfAsync(loadResult, (...getArgs) => {
                const duration = loadDuration + Date.now() - getStartTime

                // Source getting failed
                if (!getArgs[0]) {
                  return resolveGet({
                    error: ensureErrorWithMessage(getArgs[1]),
                    duration,
                  })
                }

                // Source getting succeeded
                resolveGet({ value: getArgs[1], duration })
              })
            })
        )
      })
    }
  )

  return function getComponent() {
    return sourceLoadPromise.then((finalizeSource) => finalizeSource())
  }
}

/**
 * Loads the given entropy sources. Returns a function that collects the entropy components.
 *
 * The result is returned synchronously in order to allow start getting the components
 * before the sources are loaded completely.
 *
 * Warning for package users:
 * This function is out of Semantic Versioning, i.e. can change unexpectedly. Usage is at your own risk.
 */
export function loadSources<
  TSourceOptions,
  TSources extends UnknownSources<TSourceOptions>,
  TExclude extends string
>(
  sources: TSources,
  sourceOptions: TSourceOptions,
  excludeSources: readonly TExclude[]
): () => Promise<Omit<SourcesToComponents<TSources>, TExclude>> {
  const includedSources = Object.keys(sources).filter((sourceKey) =>
    excludes(excludeSources, sourceKey)
  ) as Exclude<keyof TSources, TExclude>[]
  const sourceGetters = Array<() => Promise<Component<any>>>(
    includedSources.length
  )

  // Using `forEachWithBreaks` allows asynchronous sources to complete between synchronous sources
  // and measure the duration correctly
  forEachWithBreaks(includedSources, (sourceKey, index) => {
    sourceGetters[index] = loadSource(sources[sourceKey], sourceOptions)
  })

  return async function getComponents() {
    // Add the keys immediately to keep the component keys order the same as the source keys order
    const components = {} as Omit<SourcesToComponents<TSources>, TExclude>
    for (const sourceKey of includedSources) {
      components[sourceKey] = undefined as any
    }

    const componentPromises = Array<Promise<unknown>>(includedSources.length)

    for (;;) {
      let hasAllComponentPromises = true
      await forEachWithBreaks(includedSources, (sourceKey, index) => {
        if (!componentPromises[index]) {
          // `sourceGetters` may be incomplete at this point of execution because `forEachWithBreaks` is asynchronous
          if (sourceGetters[index]) {
            componentPromises[index] = sourceGetters[index]().then(
              (component) => (components[sourceKey] = component)
            )
          } else {
            hasAllComponentPromises = false
          }
        }
      })
      if (hasAllComponentPromises) {
        break
      }
      await wait(1) // Lets the source load loop continue
    }

    await Promise.all(componentPromises)
    return components
  }
}
