;(function (propertyId) {
  if (firstPageView() && mobile() && (slow() || !modern())) {
    return whenIdle(fetch)
  }
  return fetch()

  function slow () {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) return has(['slow-2g', '2g', '3g'], connection.effectiveType)
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

  function whenIdle (cb) {
    var start = +new Date()
    setTimeout(function () {
      if ((+new Date() - start) > 200) {
        return whenIdle(cb)
      }
      cb()
    }, 100)
  }

  function firstPageView () {
    var key = 'qubit-defer'
    if (has(decodeURIComponent(document.cookie), key)) {
      return false
    }
    document.cookie = key + '=1;'
    return true
  }

  function has (arr, thing) {
    return arr.indexOf(thing) > -1
  }

  function fetch () {
    var el = document.createElement('script')
    var loaded
    el.type = 'text\/javascript'
    el.async = true
    el.defer = true
    el.src = 'https://static.goqubit.com/smartserve-' + propertyId + '.js'
    el.onerror = el.onload = function (err) {
      if (err && err.type === 'error') return finish(err)
      if (loaded || (el.readyState && !/^(c|loade)/.test(el.readyState))) return
      return finish()
    }
    document.head.appendChild(el)
    return el

    function finish (err) {
      loaded = true
      if (el.parentElement) el.parentElement.removeChild(el)
    }
  }
})(propertyId)
