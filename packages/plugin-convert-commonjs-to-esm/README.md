# @putout/plugin-convert-commonjs-to-esm [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-commonjs-to-esm.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-commonjs-to-esm"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-commonjs-to-esm
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-commonjs-to-esm

`putout` plugin adds ability to convert Commonjs to ESM.

## Install

```
npm i @putout/plugin-convert-commonjs-to-esm -D
```

## Rule

```json
{
    "rules": {
        "convert-commonjs-to-esm/require": "on",
        "convert-commonjs-to-esm/exports": "on",
        "convert-commonjs-to-esm/commons": "on"
    }
}
```

# require

## ❌ Incorrect code example

```js
const {join} = require('path');
```

## ✅ Correct code Example

```js
import {join} from 'path';
```

# exports

## ❌ Incorrect code example

```js
module.exports = () => {
};
```

## ✅ Correct code Example

```js
export default () => {
};
```

# Commons

## ❌ Incorrect code example

```js
const {readFile} = require('fs/promises');

await readFile(__filename);
```

## ✅ Correct code Example

```js
import {readFile} from 'fs/promises';
import {createCommons} from 'simport';

const {__filename} = createCommons(import.meta.url);
await readFile(__filename);
```

## License

MIT
