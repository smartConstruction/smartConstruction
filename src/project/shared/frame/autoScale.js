(function () {
  let timeTicket
  const isIE = (function () {
    let b = document.createElement('b')
    b.innerHTML = '<!--[if IE]><i></i><![endif]-->'
    return b.getElementsByTagName('i').length === 1
  })()
  const transform = function () {
    const ratio = window.innerHeight / window.innerWidth
    let rate = 1
    if (ratio >= 768 / 1366) {
      // 比较高的屏幕，按宽度来缩放
      rate = window.innerWidth / 1366
    } else {
      // 比较宽的屏幕，按高度来缩放
      rate = window.innerHeight / 768
    }
    let body = document.body
    let frame = document.querySelector('#frame')
    let paddingLeft = parseInt(body.clientWidth - 1366 * rate) / 2

    if (isIE) {
      let frameStyle = frame.getAttribute('style')
      frame.setAttribute(
        'style',
        frameStyle +
          '-ms-transform: scale(' +
          rate +
          ',' +
          rate +
          '); left: ' +
          paddingLeft +
          'px'
      )
    } else {
      frame.style.transform = 'scale(' + rate + ')'
      frame.style.left = paddingLeft + 'px'
    }
  }
  function autoScale () {
    clearTimeout(timeTicket)
    timeTicket = setTimeout(transform, 100)
  }

  transform()
  window.addEventListener('resize', autoScale)
})()
