var eql = require('./helpers/eql')
var mobile = require('../lib/mobile')

describe('mobile', function () {
  var orientation
  beforeEach(function () {
    orientation = window.orientation
  })

  afterEach(function () {
    window.orientation = orientation
  })

  it('returns true if window.orientation is defined', function () {
    window.orientation = 'vertical'
    eql(mobile(''), true)
  })

  it('returns true if userAgent has IEMobile in it', function () {
    eql(mobile('blah IEMobile blah'), true)
    eql(mobile('IEMobile'), true)
  })

  it('returns false if window.orientation is not defined and userAgent does not have IEMobile in it', function () {
    eql(mobile(''), false)
  })
})
