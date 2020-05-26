var mobile = require('./lib/mobile')
var modern = require('./lib/modern')
var slow = require('./lib/slow')
var whenIdle = require('./lib/whenIdle')
var fetch = require('./lib/fetch')

module.exports = function (url) {
  var whenIdle = requestIdleCallback || whenIdle
  if (firstPageView('qubit-defer') && mobile() && (slow() || !modern())) {
    return whenIdle(function () {
      fetch(url)
    }, 50, 100)
  }
  return fetch(url)

  // {{ insert-lib }}
}
