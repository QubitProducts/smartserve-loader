var eql = require('./helpers/eql')
var whenIdle = require('../lib/whenIdle')
var sinon = require('sinon')

describe('whenIdle', function () {
  var clock, stub, delay, timeout
  beforeEach(function () {
    delay = 50
    timeout = 100
    stub = sinon.stub()
  })

  it('calls the callback if CPU is not idle', function (done) {
    whenIdle(done, delay, timeout)
  })

  it('delays the callback until cpu is not idle', function (done) {
    this.timeout(10000)
    whenIdle(done, delay, timeout)
    var start = +new Date()
    while ((+new Date() - start) <= (timeout + 50)) {
      eql(stub.called, false)
    }
  })
})
