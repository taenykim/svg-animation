const animation = (pathSelector, logoSelector, color) =>
  new Promise((resolve) => {
    const logo = document.getElementById(logoSelector)
    const path = document.getElementById(pathSelector)
    const totalLength = path.getTotalLength()

    const LOGO_WIDTH = logo.getBoundingClientRect().width
    const LOGO_HEIGHT = logo.getBoundingClientRect().height
    const LENGTH_ALLOW_RANGE = 50

    path.style[`stroke-dasharray`] = totalLength
    path.style[`stroke-dashoffset`] = totalLength
    path.style.stroke = color
    logo.style.stroke = color

    let time = 0

    let frame = () => {
      const currentLength = path.getPointAtLength(time)
      path.style[`stroke-dashoffset`] = totalLength - time
      const { x: nextX, y: nextY } = path.getPointAtLength(time)
      const { x: prevX, y: prevY } = path.getPointAtLength(time - 2)
      const rad = Math.atan2(nextY - prevY, nextX - prevX) + (Math.PI * 2) / 4
      logo.style.cssText += `
      transform: translate(${currentLength.x - LOGO_WIDTH}px, ${currentLength.y - LOGO_HEIGHT}px) rotate(${rad}rad)`
      if (totalLength - time <= (totalLength / 100) * 0 + LENGTH_ALLOW_RANGE) {
        path.style.stroke = "white"
        resolve({ status: "done" })
      } else {
        requestAnimationFrame(frame)
      }
      time += 15
    }
    requestAnimationFrame(frame)
  })

export { animation }
