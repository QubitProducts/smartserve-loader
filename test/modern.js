var modern = require('../lib/modern')
var eql = require('./helpers/eql')
var sinon = require('sinon')

describe('modern', function () {
  beforeEach(function () {
    sinon.stub(window, 'eval')
  })

  afterEach(function () {
    window.eval.restore()
  })

  it('returns true if arrow functions supported', function () {
    window.eval.throws('eek')
    eql(modern(), false)
  })

  it('returns false if arrow functions not supported', function () {
    window.eval.throws('eek')
    eql(modern(), false)
  })
})
