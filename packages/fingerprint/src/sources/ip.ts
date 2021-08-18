/**
 * 公网IP查询服务
 * - https://httpbin.org    hosted on AWS
 * - https://www.ipify.org  hosted on Heroku (powered by AWS)
 * - https://getjsonip.com  hosted on Linode at US
 * - https://seeip.org      hosted at US
 * - https://l2.io          hosted at France
 */
const IPServiceRecord: Record<string, string> = {
  httpbin: 'https://httpbin.org/ip',
  ipify: 'https://api.ipify.org/?format=json',
  jsonip: 'https://jsonip.com',
  l2: 'https://www.l2.io/ip.json',
  seeip: 'https://ip4.seeip.org/json',
}

/**
 * 获取公网IP地址
 */
export async function getRobustPublicIP() {
  return Promise.any(
    Object.keys(IPServiceRecord)
      .map((name) => IPServiceRecord[name])
      .map((url) => getPublicIP(url))
  )
}

interface ResponseData {
  ip: string
  origin: string
}

/**
 * 获取公网IP地址
 */
export async function getPublicIP(serviceURL: string) {
  const data: ResponseData = await fetch(serviceURL, {
    mode: 'cors',
  }).then((resp) => resp.json())
  const { ip, origin } = data
  return ip || origin
}

export async function getIPFingerprint() {
  return {
    value: await getRobustPublicIP(),
    duration: 0,
  }
}
