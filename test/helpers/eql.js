var expect = require('chai').expect

module.exports = function eql (a, b, msg) {
  expect(a).to.deep.equal(b, msg)
}
