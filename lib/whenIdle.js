module.exports = function whenIdle (cb) {
  var start = +new Date()
  setTimeout(function () {
    if ((+new Date() - start) > 200) {
      return whenIdle(cb)
    }
    cb()
  }, 100)
}
