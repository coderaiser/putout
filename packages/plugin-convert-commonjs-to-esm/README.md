# putout-plugin-convert-commonjs-to-esm [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-commonjs-to-esm.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-commonjs-to-esm"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-commonjs-to-esm
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-commonjs-to-esm

`putout` plugin adds ability to convert Commonjs to ESM.

## Install

```
npm i @putout/plugin-convert-commonjs-to-esm -D
```

## Rule

```json
{
    "rules": {
        "convert-commonjs-to-esm": true
    }
}
```

## ❌ Incorrect code example

```js
const {join} = require('path');

module.exports = () => {
};
```

## ✅ Correct code Example

```js
import {join} from 'path';

export default () => {
}
```

## License

MIT

