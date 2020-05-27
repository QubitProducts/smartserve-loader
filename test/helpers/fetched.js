module.exports = function fetched (el, cb) {
  el.onerror = el.onload = function (err) {
    if (err && err.type === 'error') return cb()
    if (el.readyState && !/^(c|loade)/.test(el.readyState)) return
    return cb()
  }
}
