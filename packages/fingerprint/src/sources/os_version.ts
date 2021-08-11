/**
 * 获取系统名称和版本号
 * Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1
 * => iPhone OS 14_7_1
 *
 * Mozilla/5.0 (Linux; Android 10; Redmi 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.119 Mobile Safari/537.36
 * =>  Android 10; Redmi 8
 */
export function getOSVersion() {
  return parseOSVersion(navigator.userAgent)
}

export function getOSVersionFingerprint() {
  return {
    value: getOSVersion(),
    duration: 0,
  }
}

/**
 * 解析 userAgent 中的系统名称和版本号
 */
export function parseOSVersion(userAgent: string) {
  const iPhoneMatches = /iPhone OS ([\d_]+)\s/.exec(userAgent)
  const iPhoneVersion =
    Array.isArray(iPhoneMatches) && iPhoneMatches.length > 1
      ? iPhoneMatches[1].replace(/_/g, '.')
      : ''
  const androidMatches = /Android ([\d\.]+);/.exec(userAgent)
  const androidVersion =
    Array.isArray(androidMatches) && androidMatches.length > 1
      ? androidMatches[1]
      : ''
  const androidModelMatches =
    /Android [\d\.]+;( \w+-\w+;)? ([\w\s\-]+(\(\d+\))?)((\sBuild\/)|(\)))/.exec(
      userAgent
    )
  const AndroidModel =
    Array.isArray(androidModelMatches) && androidModelMatches.length > 2
      ? androidModelMatches[2]
      : ''
  return {
    iPhone: /iPhone/i.test(userAgent),
    iPhoneVersion: iPhoneVersion,
    Android: /Android/i.test(userAgent),
    AndroidVersion: androidVersion,
    AndroidModel: AndroidModel,
  }
}
