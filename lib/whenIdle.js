module.exports = function whenIdle (delay, timeout) {
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
