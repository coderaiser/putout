# @putout/plugin-convert-commonjs-to-esm [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-commonjs-to-esm.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-commonjs-to-esm"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to convert Commonjs to ESM.

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

const args = require('minimist')({
    string: ['a', 'b'],
});
```

## ✅ Correct code Example

```js
import {join} from 'path';
import minimist from 'minimist';

const args = minimist({
    string: ['a', 'b'],
});
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
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
await readFile(__filename);
```

## License

MIT
