var eql = require('./helpers/eql')
var firstView = require('../lib/firstView')

describe('firstView', function () {
  var key = 'qubit-defer'
  afterEach(function () {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  })

  it('returns true only if it is the first page view', function () {
    eql(firstView(key), true)
    eql(firstView(key), false)
    eql(firstView(key), false)
  })
})
