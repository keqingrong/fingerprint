import { load, hashComponents, isAndroid } from './fingerprintjs'
import { getGpuInfo, getGpuFingerprint } from './sources/gpu'
import { getPublicIP, getRobustPublicIP, getIPFingerprint } from './sources/ip'
import { getOSVersion, getOSVersionFingerprint } from './sources/os_version'

export * from './fingerprintjs'
export {
  getGpuInfo,
  getGpuFingerprint,
  getPublicIP,
  getRobustPublicIP,
  getIPFingerprint,
  getOSVersion,
  getOSVersionFingerprint,
}

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
type GetResult = Awaited<ReturnType<typeof getResult>>
type Components = Parameters<typeof hashComponents>[0]

const agentPromise = load()

export async function getResult() {
  const agent = await agentPromise
  const result = await agent.get()
  return result
}

export async function getHash(res?: GetResult) {
  const result = res === undefined ? await getResult() : res
  const { visitorId } = result
  return visitorId
}

export async function getCanvasHash(res?: GetResult) {
  const result = res === undefined ? await getResult() : res
  const { components } = result
  const canvasHash = hashComponents({
    canvas: components.canvas,
  })
  return canvasHash
}

export async function getCanvasStableHash(res?: GetResult) {
  const result = res === undefined ? await getResult() : res
  const { components } = result
  if (components.canvas.value) {
    const canvasHashStable = hashComponents({
      canvas: {
        ...components.canvas,
        value: {
          ...components.canvas.value,
          text: '',
        },
      },
    })
    return canvasHashStable
  }
  return null
}

export async function getAudioHash(res?: GetResult) {
  const result = res === undefined ? await getResult() : res
  const { components } = result
  const audioHash = hashComponents({
    audio: components.audio,
  })
  return audioHash
}

export async function getCustomHash(res?: GetResult) {
  const result = res === undefined ? await getResult() : res
  const { components } = result
  const customComponents: Components = {
    audio: components.audio,
    canvas: components.canvas,
    platform: components.platform,
    screenResolution: components.screenResolution,
    osVersion: getOSVersionFingerprint(),
  }
  if (isAndroid()) {
    // 同一台 Android 手机，苏宁易购内置浏览器的 audio 指纹仅和猎豹浏览器、
    // 百度浏览器、手机 QQ 内置浏览器相同，和其他浏览器均不同。
    delete customComponents.audio
  }
  const customHash = hashComponents(customComponents)
  return customHash
}

export async function getHashes() {
  const result = await getResult()
  const hash = await getHash(result)
  const canvasHash = await getCanvasHash(result)
  const canvasStableHash = await getCanvasStableHash(result)
  const audioHash = await getAudioHash(result)
  const customHash = await getCustomHash(result)
  return {
    hash,
    canvasHash,
    canvasStableHash,
    audioHash,
    customHash,
  }
}
