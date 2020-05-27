#! /usr/bin/env node

const fs = require('fs')
const uglify = require('uglify-js')

fs.readdir('lib', (err, files) => {
  if (err) throw err
  const lib = files
    .map(file =>
      String(fs.readFileSync('lib/' + file))
        .replace('module.exports = ', '')
        .replace(/.*require.*/mg, '')
        .trim()
        .replace(/^(.)/mg, '  $1')
    )
    .join('\n\n')

  const main = String(fs.readFileSync('./main.js'))
    .replace(/.*require.*/mg, '')
    .trim()
    .replace(/.*\}\s*$/i, '\n' + lib + '\n}')

  fs.writeFileSync('./index.js', main + '\n')

  const wrapped = ';(' + main.replace('module.exports = ', '') + ')(url);'

  fs.writeFileSync('./snippet.js', uglify.minify(wrapped, {
    mangle: true,
    compress: true
  }).code + '\n')
})
