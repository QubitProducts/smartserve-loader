module.exports = function slow (connection) {
  return connection
    ? ['slow-2g', '2g', '3g'].indexOf(connection.effectiveType) > -1
    : false
}
