module.exports = function whenIdle (cb, delay, timeout) {
  var start = +new Date()
  setTimeout(function () {
    if ((+new Date() - start) > (delay + timeout)) {
      return whenIdle(cb, delay, timeout)
    }
    cb()
  }, delay)
}
