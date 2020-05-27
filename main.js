var mobile = require('./lib/mobile')
var modern = require('./lib/modern')
var slow = require('./lib/slow')
var whenIdle = require('./lib/whenIdle')
var firstView = require('./lib/firstView')
var fetch = require('./lib/fetch')

module.exports = function (url) {
  var el = document.createElement('script')
  var defer = window.requestIdleCallback || whenIdle(50, 100)
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  if (firstView('qubit-defer') && mobile(navigator.userAgent) && (slow(connection) || !modern())) {
    defer(function () {
      fetch(el, url)
    })
    return el
  }
  return fetch(el, url)
}
