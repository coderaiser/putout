# @putout/plugin-convert-commonjs-to-esm [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-commonjs-to-esm.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-commonjs-to-esm "npm"

> **CommonJS** is a module system supported in Node, it provides a `require` function, which can be used to access the `exports` object exposed by another file.
>
> **EcmaScript module** syntax is the standard way to import and export values between files in **JavaScript**. The `import` statement can be used to reference a value exposed by the `export` statement in another file.
>
> (c) [parceljs](https://parceljs.org/languages/javascript/)


🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert Commonjs to ESM.

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

## ❌ Example of incorrect code

```js
const {join} = require('path');

const args = require('minimist')({
    string: ['a', 'b'],
});
```

## ✅ Example of correct code

```js
import {join} from 'path';
import minimist from 'minimist';

const args = minimist({
    string: ['a', 'b'],
});
```

# exports

## ❌ Example of incorrect code

```js
module.exports = () => {
};
```

## ✅ Example of correct code

```js
export default () => {
};
```

# Commons

## ❌ Example of incorrect code

```js
const {readFile} = require('fs/promises');

await readFile(__filename);
```

## ✅ Example of correct code

```js
import {readFile} from 'fs/promises';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
await readFile(__filename);
```

## License

MIT
