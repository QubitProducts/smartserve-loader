module.exports = function (url) {
  var defer = window.requestIdleCallback || whenIdle
  if (firstPageView('qubit-defer') && mobile() && (slow() || !modern())) {
    return defer(function () {
      fetch(url)
    }, 50, 100)
  }
  return fetch(url)

  function fetch (url) {
    var el = document.createElement('script')
    el.type = 'text/javascript'
    el.async = true
    el.defer = true
    el.src = url
    document.head.appendChild(el)
    return el
  }

  function firstPageView (key) {
    if (has(document.cookie, key)) {
      return false
    }
    document.cookie = key + '=1;'
    return true
  }

  function has (arr, thing) {
    return arr.indexOf(thing) > -1
  }

  function mobile () {
    return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
  }

  function modern () {
    try {
      return Boolean(eval('(async () => await true)()').then) // eslint-disable-line no-eval
    } catch (err) {
      return false
    }
  }

  function slow () {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection) return has(['slow-2g', '2g', '3g'], connection.effectiveType)
  }

  function whenIdle (cb, delay, timeout) {
    var start = +new Date()
    setTimeout(function () {
      if ((+new Date() - start) > (delay + timeout)) {
        return whenIdle(cb, delay, timeout)
      }
      cb()
    }, delay)
  }
}
