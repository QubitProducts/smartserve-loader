var mobile = require('./lib/mobile')
var modern = require('./lib/modern')
var slow = require('./lib/slow')
var whenIdle = require('./lib/whenIdle')
var fetch = require('./lib/fetch')

module.exports = function (url) {
  var whenIdle = requestIdleCallback || whenIdle
  if (firstPageView() && mobile() && (slow() || !modern())) {
    return whenIdle(function () {
      fetch(url)
    })
  }
  return fetch(url)

  // {{ insert-lib }}
}
