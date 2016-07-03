const fs = require('fs')
const path = require('path')
const z = require('zero-fill')
const fileExists = require('file-exists')
const matroskaSubtitles = require('matroska-subtitles')

/**
 * Reads mkv file and writes srt files in same location
 */
module.exports = function (mkvPath) {
  var file = fs.createReadStream(mkvPath)

  file.on('error', function (err) {
    console.error('Error:', err.message)
    process.exit(1)
  })

  var dir = path.dirname(mkvPath)
  var name = path.basename(mkvPath, path.extname(mkvPath))

  // create srt path from language suffix
  var srtPath = function (language) {
    var languageSuffix = language ? '.' + language : ''
    return path.join(dir, name + languageSuffix + '.srt')
  }

  var tracks = new Map()
  var subs = matroskaSubtitles()

  subs.on('data', function (data) {
    if (data[0] === 'new') {
      var subtitlePath = srtPath(data[1].language)

      // obtain unique filename (don't overwrite)
      for (var i = 2; fileExists(subtitlePath); i++) {
        subtitlePath = srtPath(data[1].language + i || i)
      }

      tracks.set(data[1].track, {
        index: 1,
        file: fs.createWriteStream(subtitlePath)
      })
    } else {
      var track = tracks.get(data[0])
      var sub = data[1]

      // convert to srt format
      track.file.write(`${track.index++}\r\n`)
      track.file.write(`${msToTime(sub.time)} --> ${msToTime(sub.time + sub.duration)}\r\n`)
      track.file.write(`${sub.text}\r\n\r\n`)
    }
  })

  subs.on('end', function () {
    console.log(mkvPath)

    if (tracks.size === 0) {
      return console.log('    No subtitle tracks found.')
    }

    tracks.forEach(function (track, i) {
      track.file.end()
      console.log(`    Track ${z(2, i)} → ${track.file.path}`)
    })
  })

  file.pipe(subs)
}

// https://stackoverflow.com/questions/9763441/milliseconds-to-time-in-javascript
function msToTime (s) {
  var ms = s % 1000
  s = (s - ms) / 1000
  var secs = s % 60
  s = (s - secs) / 60
  var mins = s % 60
  var hrs = (s - mins) / 60

  return z(2, hrs) + ':' + z(2, mins) + ':' + z(2, secs) + ',' + z(3, ms)
}
