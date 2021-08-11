export async function getIP() {
  const resp: { ip: string } = await fetch('https://jsonip.com', {
    mode: 'cors',
  }).then((resp) => resp.json())
  const { ip } = resp
  return ip || null
}

export async function getIPFingerprint() {
  return {
    value: await getIP(),
    duration: 0,
  }
}
