var has = require('./has')

module.exports = function slow (connection) {
  return connection
    ? has(['slow-2g', '2g', '3g'], connection.effectiveType)
    : false
}
