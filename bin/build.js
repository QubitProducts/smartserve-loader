#! /usr/bin/env node

const fs = require('fs')
const uglify = require('uglify-js')

fs.readdir('lib', (err, files) => {
  if (err) throw err
  var lib = files
    .map(file =>
      String(fs.readFileSync('lib/' + file))
        .replace('module.exports = ', '')
        .replace(/.*require.*/mg, '')
        .trim()
        .replace(/^(.)/mg, '  $1')
    )
    .join('\n\n')

  var src = String(fs.readFileSync('./src.js'))
    .replace(/.*require.*/mg, '')
    .trim()
    .replace(/.*{{ insert-lib }}.*/, lib)

  fs.writeFileSync('./index.js', src + '\n')

  var wrapped = ';(' + src.replace('module.exports = ', '') + ')(url);'

  fs.writeFileSync('./snippet.js', uglify.minify(wrapped, {
    mangle: true,
    compress: true
  }).code + '\n')
})
