/**
 * 로딩 UI
 */
window.onload = async () => {
  const queue = ["#ffffff", "#ff00ff", "ff0000"]
  const logo = document.querySelector("#logo")
  const logo2 = document.querySelector("#logo2")
  const path = document.querySelector("#path1")
  const totalLength = path.getTotalLength()

  const LOGO_WIDTH = 9.5
  const LOGO_HEIGHT = 9.5
  const LENGTH_ALLOW_RANGE = 0
  console.log(LOGO_WIDTH)

  path.style[`stroke-dasharray`] = totalLength / 2
  path.style[`stroke-dashoffset`] = totalLength

  let time = 0

  let frame = () => {
    const currentLength = path.getPointAtLength(time)
    path.style[`stroke-dashoffset`] = totalLength - time - totalLength / 2
    const { x: nextX, y: nextY } = path.getPointAtLength(time)
    const { x: prevX, y: prevY } = path.getPointAtLength(time - 2)
    const rad = Math.atan2(nextY - prevY, nextX - prevX) + (Math.PI * 2) / 4
    logo.style.cssText = `
    transform: translate(${currentLength.x - LOGO_WIDTH}px, ${currentLength.y - LOGO_HEIGHT}px) rotate(${rad}rad)`
    if (totalLength - time <= (totalLength / 100) * 0 + LENGTH_ALLOW_RANGE) {
      time = 0
      requestAnimationFrame(frame)
      return
    } else if (
      totalLength - time <= (totalLength / 100) * 65 + LENGTH_ALLOW_RANGE &&
      totalLength - time >= (totalLength / 100) * 35 + LENGTH_ALLOW_RANGE
    ) {
      time += 10
      requestAnimationFrame(frame)
    } else if (totalLength - time <= (totalLength / 100) * 25 + LENGTH_ALLOW_RANGE) {
      time += 10
      requestAnimationFrame(frame)
    } else {
      time += 10
      requestAnimationFrame(frame)
    }
  }

  requestAnimationFrame(frame)
}
