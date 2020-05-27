module.exports = function firstView (key) {
  if (document.cookie.indexOf(key) > -1) {
    return false
  }
  document.cookie = key + '=1;'
  return true
}
