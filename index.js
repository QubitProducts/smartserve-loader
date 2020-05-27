module.exports = function (url) {
  var el = document.createElement('script')
  var defer = window.requestIdleCallback || whenIdle(50, 100)
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  if (firstView('qubit-defer') && mobile(navigator.userAgent) && (slow(connection) || !modern())) {
    defer(function () {
      fetch(el, url)
    })
  } else {
    fetch(el, url)
  }
  return el

  function fetch (el, url) {
    el.type = 'text/javascript'
    el.async = true
    el.defer = true
    el.src = url
    document.head.appendChild(el)
  }

  function firstView (key) {
    if (has(document.cookie, key)) {
      return false
    }
    document.cookie = key + '=1;'
    return true
  }

  function has (arr, thing) {
    return arr.indexOf(thing) > -1
  }

  function mobile (userAgent) {
    return (typeof window.orientation !== 'undefined') || (userAgent.indexOf('IEMobile') !== -1)
  }

  function modern () {
    try {
      return Boolean(eval('()=>{}')) // eslint-disable-line no-eval
    } catch (err) {
      return false
    }
  }

  function slow (connection) {
    return connection
      ? has(['slow-2g', '2g', '3g'], connection.effectiveType)
      : false
  }

  function whenIdle (delay, timeout) {
    return function whenIdle (cb) {
      var start = +new Date()
      setTimeout(function () {
        if ((+new Date() - start) > (delay + timeout)) {
          return whenIdle(cb, delay, timeout)
        }
        cb()
      }, delay)
    }
  }
}
