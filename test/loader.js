var rewire = require('rewire')
var loader = rewire('../main')
var fetched = require('./helpers/fetched')
var eql = require('./helpers/eql')
var sinon = require('sinon')

describe('loader', function () {
  var teardown, sandbox, token, url

  beforeEach(function () {
    sandbox = sinon.createSandbox()
    token = Math.random()
    url = '/base/test/fixtures/fetch.js?_=' + token
    teardown = []
  })

  afterEach(function () {
    while (teardown.length) teardown.pop()()
  })

  it('should pass userAgent to mobile', function (done) {
    var mobile = sandbox.stub().returns(true)
    teardown.push(loader.__set__({ mobile: mobile }))
    fetched(loader(url), function () {
      eql(mobile.calledWith(navigator.userAgent), true)
      done()
    })
  })

  it('should fall back on whenIdle if requestIdleCallback not available', function (done) {
    var whenIdleStub = sandbox.stub().callsFake(function (cb) {
      cb()
    })
    sandbox.stub(window, 'requestIdleCallback').value(false)
    teardown.push(loader.__set__({
      slow: sandbox.stub().returns(true),
      modern: sandbox.stub().returns(true),
      firstView: sandbox.stub().returns(true),
      mobile: sandbox.stub().returns(true),
      whenIdle: sandbox.stub().returns(whenIdleStub)
    }))
    fetched(loader(url), function () {
      eql(whenIdleStub.called, true)
      done()
    })
  })

  describe('connection', function () {
    it('should pass navigator.connection to slow', function (done) {
      var slow = sandbox.stub().returns(true)
      var connection = { effectiveType: '2g' }
      stub(window.navigator, 'connection', connection)
      teardown.push(loader.__set__({
        slow: slow,
        modern: sandbox.stub().returns(true),
        firstView: sandbox.stub().returns(true),
        mobile: sandbox.stub().returns(true)
      }))
      fetched(loader(url), function () {
        eql(slow.calledWith(connection), true)
        done()
      })
    })

    it('should fall back on mozConnection', function (done) {
      var slow = sandbox.stub().returns(true)
      var connection = { effectiveType: '2g' }
      stub(window.navigator, 'connection', false)
      stub(window.navigator, 'mozConnection', connection)
      teardown.push(loader.__set__({
        slow: slow,
        modern: sandbox.stub().returns(true),
        firstView: sandbox.stub().returns(true),
        mobile: sandbox.stub().returns(true)
      }))
      fetched(loader(url), function () {
        eql(slow.calledWith(connection), true)
        done()
      })
    })

    it('should fall back on webkitConnection', function (done) {
      var slow = sandbox.stub().returns(true)
      var connection = { effectiveType: '2g' }
      stub(window.navigator, 'connection', false)
      stub(window.navigator, 'mozConnection', false)
      stub(window.navigator, 'webkitConnection', connection)
      teardown.push(loader.__set__({
        slow: slow,
        modern: sandbox.stub().returns(true),
        firstView: sandbox.stub().returns(true),
        mobile: sandbox.stub().returns(true)
      }))
      fetched(loader(url), function () {
        eql(slow.calledWith(connection), true)
        done()
      })
    })
  })

  describe('defer', function () {
    describe('slow connection', function () {
      it('should defer if firstView and mobile', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(true),
          modern: sinon.stub().returns(true),
          firstView: sinon.stub().returns(true),
          mobile: sinon.stub().returns(true)
        }))
        eql(wasDeferred(done), true)
      })

      it('should not defer if cached', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(true),
          modern: sinon.stub().returns(true),
          firstView: sinon.stub().returns(false),
          mobile: sinon.stub().returns(true)
        }))
        eql(wasDeferred(done), false)
      })

      it('should not defer if desktop', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(true),
          modern: sinon.stub().returns(true),
          firstView: sinon.stub().returns(true),
          mobile: sinon.stub().returns(false)
        }))
        eql(wasDeferred(done), false)
      })
    })

    describe('fast connection', function () {
      it('should not defer if firstView and mobile', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(false),
          modern: sinon.stub().returns(true),
          firstView: sinon.stub().returns(true),
          mobile: sinon.stub().returns(true)
        }))
        eql(wasDeferred(done), false)
      })

      it('should not defer if cached', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(false),
          modern: sinon.stub().returns(true),
          firstView: sinon.stub().returns(false),
          mobile: sinon.stub().returns(true)
        }))
        eql(wasDeferred(done), false)
      })

      it('should not defer if desktop', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(false),
          modern: sinon.stub().returns(true),
          firstView: sinon.stub().returns(true),
          mobile: sinon.stub().returns(false)
        }))
        eql(wasDeferred(done), false)
      })
    })

    describe('modern device', function () {
      it('should not defer if firstView and mobile', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(false),
          modern: sinon.stub().returns(true),
          firstView: sinon.stub().returns(true),
          mobile: sinon.stub().returns(true)
        }))
        eql(wasDeferred(done), false)
      })

      it('should not defer if cached', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(false),
          modern: sinon.stub().returns(true),
          firstView: sinon.stub().returns(false),
          mobile: sinon.stub().returns(true)
        }))
        eql(wasDeferred(done), false)
      })

      it('should not defer if desktop', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(false),
          modern: sinon.stub().returns(true),
          firstView: sinon.stub().returns(true),
          mobile: sinon.stub().returns(false)
        }))
        eql(wasDeferred(done), false)
      })
    })

    describe('old device', function () {
      it('should defer if firstView and mobile', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(false),
          modern: sinon.stub().returns(false),
          firstView: sinon.stub().returns(true),
          mobile: sinon.stub().returns(true)
        }))
        eql(wasDeferred(done), true)
      })

      it('should not defer if cached', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(false),
          modern: sinon.stub().returns(false),
          firstView: sinon.stub().returns(false),
          mobile: sinon.stub().returns(true)
        }))
        eql(wasDeferred(done), false)
      })

      it('should not defer if desktop', function (done) {
        teardown.push(loader.__set__({
          slow: sinon.stub().returns(false),
          modern: sinon.stub().returns(false),
          firstView: sinon.stub().returns(true),
          mobile: sinon.stub().returns(false)
        }))
        eql(wasDeferred(done), false)
      })
    })
  })

  function stub (obj, prop, value) {
    if (obj[prop]) {
      return sandbox.stub(obj, prop).value(value)
    }
    var original = obj[prop]
    obj[prop] = value

    teardown.push(function restore () {
      obj[prop] = original
    })
  }

  function wasDeferred (cb) {
    var el = loader(url)
    var deferred = !el.parentElement
    fetched(el, cb)
    return deferred
  }
})
