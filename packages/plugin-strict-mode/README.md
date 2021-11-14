# @putout/plugin-strict-mode [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-strict-mode.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-strict-mode "npm"

[🐊`Putout`](https://github.com/coderaiser/putout) plugin adds ability to add or remove `strict mode`.

## Install

```
npm i @putout/plugin-strict-mode -D
```

## Rule

```json
{
    "rules": {
        "strict-mode/add": "on",
        "strict-mode/remove": "on"
    }
}
```

## ❌ Incorrect code example

```js
// ESM

'strict mode';

import a from 'b';
```

```js
// CommonJS
const a = require('b');
```

## ✅ Correct code Example

```js
// ESM
import a from 'b';
```

```js
// CommonJS

'strict mode';

const a = require('b');
```

## License

MIT
