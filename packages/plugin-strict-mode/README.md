# @putout/plugin-strict-mode [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-strict-mode.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-strict-mode "npm"

> **Strict mode** makes several changes to normal **JavaScript** semantics:
>
> - Eliminates some **JavaScript** silent errors by changing them to throw errors.
> - Fixes mistakes that make it difficult for **JavaScript** engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
> - Prohibits some syntax likely to be defined in future versions of **ECMAScript**.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to add **strict mode** to **CommonJS**, and remove from **ESM**, where it enabled by default.

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

## ❌ Example of incorrect code

```js
// ESM

'strict mode';

import a from 'b';
```

```js
// CommonJS
const a = require('b');
```

## ✅ Example of correct code

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
