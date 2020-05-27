var eql = require('./helpers/eql')
var fetched = require('./helpers/fetched')
var fetch = require('../lib/fetch')

describe('fetch', function () {
  afterEach(function () {
    delete window.fetched
  })

  it('fetches and executes a script', function (done) {
    var el = document.createElement('script')
    fetched(fetch(el, '/base/test/fixtures/fetch.js?_=' + Math.random()), function () {
      try {
        eql(window.fetched, true)
        done()
      } catch (err) {
        done(err)
      }
    })
  })
})
