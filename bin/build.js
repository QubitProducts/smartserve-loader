#! /usr/bin/env node

var fs = require('fs')
var uglify = require('uglify-js')

fs.readdir('lib', function (err, files) {
  if (err) throw err
  var lib = files
    .map(function (file) {
      return String(fs.readFileSync('lib/' + file))
        .replace('module.exports = ', '')
        .replace(/.*require.*/mg, '')
        .trim()
        .replace(/^(.)/mg, '  $1')
    })
    .join('\n\n')

  var main = String(fs.readFileSync('./main.js'))
    .replace(/.*require.*/mg, '')
    .trim()
    .replace(/.*\}\s*$/i, '\n' + lib + '\n}')

  fs.writeFileSync('./index.js', main + '\n')

  var wrapped = ';(' + main.replace('module.exports = ', '') + ')(url);'

  fs.writeFileSync('./snippet.js', uglify.minify(wrapped, {
    mangle: true,
    compress: true
  }).code + '\n')
})
