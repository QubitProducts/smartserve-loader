module.exports = function fetch (url) {
  var el = document.createElement('script')
  el.type = 'text/javascript'
  el.async = true
  el.defer = true
  el.src = url
  document.head.appendChild(el)
  return el
}
