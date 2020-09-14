/**
 * 로딩 UI
 */
window.onload = async () => {
  const logo = document.querySelector("#logo")
  const path = document.querySelector("#path1")
  const totalLength = path.getTotalLength()

  const LOGO_WIDTH = 16
  const LOGO_HEIGHT = 16
  const LENGTH_ALLOW_RANGE = 50
  console.log(LOGO_WIDTH)

  path.style[`stroke-dasharray`] = totalLength
  path.style[`stroke-dashoffset`] = totalLength

  let time = 0

  let frame = () => {
    const currentLength = path.getPointAtLength(time)
    path.style[`stroke-dashoffset`] = totalLength - time
    const { x: nextX, y: nextY } = path.getPointAtLength(time)
    const { x: prevX, y: prevY } = path.getPointAtLength(time - 2)
    const rad = Math.atan2(nextY - prevY, nextX - prevX) + (Math.PI * 2) / 4
    logo.style.cssText += `
    transform: translate(${currentLength.x - LOGO_WIDTH}px, ${currentLength.y - LOGO_HEIGHT}px) rotate(${rad}rad)`
    if (totalLength - time <= (totalLength / 100) * 20 + LENGTH_ALLOW_RANGE) {
      return
    } else {
      requestAnimationFrame(frame)
    }
    time += 5
  }
  requestAnimationFrame(frame)
}
