#!/usr/bin/env node
const mkvSubtitleExtractor = require('.')

if (process.argv.length < 3 || process.argv[2] === '--help') {
  var pkg = require('./package.json')
  console.log(`Version ${pkg.version}`)
  console.log(`Usage: ${pkg.name} <file.mkv ...>`)
  process.exit(0)
}

var mkvPaths = process.argv.slice(2)

mkvPaths.forEach(path => mkvSubtitleExtractor(path))
