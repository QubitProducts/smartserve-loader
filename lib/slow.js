var has = require('./has')

module.exports = function slow () {
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) return has(['slow-2g', '2g', '3g'], connection.effectiveType)
}
