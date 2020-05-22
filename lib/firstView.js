var has = require('./has')

module.exports = function firstPageView () {
  var key = 'qubit-defer'
  if (has(document.cookie, key)) {
    return false
  }
  document.cookie = key + '=1;'
  return true
}