# mkv-subtitle-extractor [![npm][npm-img]][npm-url] [![dependencies][dep-img]][dep-url] [![license][lic-img]][lic-url]

[npm-img]: https://img.shields.io/npm/v/mkv-subtitle-extractor.svg
[npm-url]: https://www.npmjs.com/package/mkv-subtitle-extractor
[dep-img]: https://david-dm.org/mathiasvr/mkv-subtitle-extractor.svg
[dep-url]: https://david-dm.org/mathiasvr/mkv-subtitle-extractor
[lic-img]: http://img.shields.io/:license-MIT-blue.svg
[lic-url]: http://mvr.mit-license.org

Extract subtitles from .mkv files.

> Currently only supports the .srt format.

## install

```
npm install -g mkv-subtitle-extractor
```

## usage

```
mkv-subtitle-extractor file.mkv ...
```

All supported subtitle tracks are written to the same destination with non-overwriting (incremental) names.
> file.srt, file.2.srt, file.eng.srt, file.ger.srt, file.ita.srt, ...

## license

MIT
