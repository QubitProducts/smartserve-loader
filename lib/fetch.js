module.exports = function fetch (el, url) {
  el.type = 'text/javascript'
  el.async = true
  el.defer = true
  el.src = url
  document.head.appendChild(el)
}
