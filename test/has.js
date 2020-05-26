var eql = require('./helpers/eql')
var has = require('../lib/has')

describe('has', function () {
  it('returns true if the array has it', function () {
    eql(has([1, 2, 3], 3), true)
    eql(has(['a', 'b','c'], 'c'), true)
  })

  it('returns false if the array does not have it', function () {
    eql(has([1, 2, 3], 4), false)
    eql(has(['a', 'b','c'], 'd'), false)
  })
})
