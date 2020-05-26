var eql = require('./helpers/eql')
var fetch = require('../lib/fetch')

describe('fetch', function () {
  afterEach(function () {
    delete window.fetchTest
  })

  it('fetches and executes a script', function (done) {
    then(fetch('/base/test/fixtures/fetch.js?_=' + Math.random()), function () {
      try {
        eql(window.fetchTest, 123)
        done()
      } catch (err) {
        done(err)
      }
    })
  })
})

function then (el, cb) {
  el.onerror = el.onload = function (err) {
    if (err && err.type === 'error') return cb()
    if (el.readyState && !/^(c|loade)/.test(el.readyState)) return
    return cb()
  }
}
