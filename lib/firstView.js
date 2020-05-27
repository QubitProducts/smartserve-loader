var has = require('./has')

module.exports = function firstView (key) {
  if (has(document.cookie, key)) {
    return false
  }
  debugger
  document.cookie = key + '=1;'
  return true
}
