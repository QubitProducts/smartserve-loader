module.exports = function mobile (userAgent) {
  return (typeof window.orientation !== 'undefined') || (userAgent.indexOf('IEMobile') !== -1)
}
