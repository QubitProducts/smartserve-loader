var eql = require('./helpers/eql')
var slow = require('../lib/slow')

describe('slow', function () {
  it('should return true if connection is slow', function () {
    eql(slow({ effectiveType: 'slow-2g' }), true)
    eql(slow({ effectiveType: '2g' }), true)
    eql(slow({ effectiveType: '3g' }), true)
  })

  it('should return false if connection is 4g', function () {
    eql(slow({ effectiveType: '4g' }), false)
  })

  it('should return false if connection is unavailable', function () {
    eql(slow(), false)
    eql(slow({ effectiveType: '' }), false)
  })
})
