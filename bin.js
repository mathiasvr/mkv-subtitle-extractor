#!/usr/bin/env node
'use strict'

const mkvSubtitleExtractor = require('.')
const z = require('zero-fill')

if (process.argv.length < 3 || process.argv[2] === '--help') {
  const pkg = require('./package.json')
  console.log(`Version ${pkg.version}`)
  console.log(`Usage: ${pkg.name} <file.mkv ...>`)
  process.exit(0)
}

const mkvPaths = process.argv.slice(2)

let promise = Promise.resolve()

mkvPaths.forEach(path => {
  promise = promise.then(() => mkvSubtitleExtractor(path)
    .then(tracks => {
      console.log(path)
      if (tracks.length === 0) return console.log('    No subtitle tracks found.')
      tracks.forEach(track => console.log(`    Track ${z(2, track.number)} → ${track.path}`))
    })
    .catch(err => {
      console.error(`Error while processing ${path}:`, err.message)
      process.exit(1)
    })
  )
})
