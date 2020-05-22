module.exports = function (url) {
  var whenIdle = requestIdleCallback || whenIdle
  if (firstPageView() && mobile() && (slow() || !modern())) {
    return whenIdle(function () {
      fetch(url)
    })
  }
  return fetch(url)

  function fetch (url) {
    var el = document.createElement('script')
    var loaded
    el.type = 'text\/javascript'
    el.async = true
    el.defer = true
    el.src = url
    document.head.appendChild(el)
  }

  function firstPageView () {
    var key = 'qubit-defer'
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
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }

  function modern () {
    try {
      return Boolean(eval('(async () => await true)()').then)
    } catch (err) {
      return false
    }
  }

  function slow () {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) return has(['slow-2g', '2g', '3g'], connection.effectiveType)
  }

  function whenIdle (cb) {
    var start = +new Date()
    setTimeout(function () {
      if ((+new Date() - start) > 200) {
        return whenIdle(cb)
      }
      cb()
    }, 100)
  }
}