# @putout/plugin-convert-fs-to-promises [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-fs-to-promises.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-fs-to-promises "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-fs-to-promises
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-fs-to-promises

`putout` plugin adds ability to convert `Math.pow` to `exponentiation operator`.
## Install

```
npm i @putout/plugin-convert-fs-to-promises -D
```

## Rule

Rule `convert-fs-to-promises` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-fs-to-promises": false
    }
}
```

## ❌ Incorrect code example

```js
const fs = require('fs');
const readFile = promisify(fs.readFile);
```

## ✅ Correct code Example

```js
const {readFile} = require('fs').promises;
```

## License

MIT

