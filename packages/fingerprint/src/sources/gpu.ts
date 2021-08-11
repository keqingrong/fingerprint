export function getGpuInfo() {
  let canvas: HTMLCanvasElement | null = document.createElement('canvas')
  let gl = canvas.getContext('webgl')
  if (gl === null) {
    return null
  }
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
  if (!debugInfo) {
    return null
  }
  const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
  canvas = null
  gl = null
  return {
    vendor: vendor,
    renderer: renderer,
  }
}

export function getGpuFingerprint() {
  return {
    value: getGpuInfo(),
    duration: 0,
  }
}
