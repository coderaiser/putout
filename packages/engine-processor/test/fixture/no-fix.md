# Async Clipboard [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[Async clipboard api](https://w3c.github.io/clipboard-apis/) uses `navigator.clipboard` if available or smallest `polyfill` in the world.

## Install

```
npm i @cloudcmd/clipboard
```

## API

### writeText(str)

Write text to clipboard.

```js
const clipboard = require('@cloudcmd/clipboard');

clipboard.writeText('hello')
    .then(console.log)
    .catch(console.error);
```

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/@cloudcmd/clipboard.svg?style=flat&longCache=true
[BuildStatusIMGURL]:        https://img.shields.io/travis/cloudcmd/clipboard/master.svg?style=flat&longCache=true
[CoverageIMGURL]:           https://coveralls.io/repos/cloudcmd/clipboard/badge.svg?branch=master&service=github
[NPMURL]:                   https://npmjs.org/package/@cloudcmd/clipboard "npm"
[BuildStatusURL]:           https://travis-ci.org/cloudcmd/clipboard  "Build Status"
[CoverageURL]:              https://coveralls.io/github/cloudcmd/clipboard?branch=master

