var has = require('./has')

module.exports = function firstView (key) {
  if (has(document.cookie, key)) {
    return false
  }
  document.cookie = key + '=1;'
  return true
}
