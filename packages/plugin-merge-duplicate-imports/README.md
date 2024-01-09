# @putout/plugin-merge-duplicate-imports [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-merge-duplicate-imports.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-merge-duplicate-imports "npm"

> The static `import` statement is used to `import` read only live bindings which are exported by another module.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and merge duplicate imports.

## Install

```
npm i @putout/plugin-merge-duplicate-imports
```

```json
{
    "rules": {
        "merge-duplicate-imports/join": "on",
        "merge-duplicate-imports/rename": "on"
    }
}
```

## join

### ❌ Example of incorrect code

```js
import test from 'supertape';
import {stub} from 'supertape';
```

### ✅ Example of correct code

```js
import test, {stub} from 'supertape';
```

## rename

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/6604936dec6b1eed8ce0d143f2962f15/17b310a6e4d85b0b8615a8b91d0e27414e8af291).

### ❌ Example of incorrect code

```js
import putout from './putout.js';
import all from './putout.js';
import x from './putout.js';

console.log(all);
console.log(x);
```

### ✅ Example of correct code

```js
import putout from './putout.js';

console.log(putout);
console.log(putout);
```

## License

MIT
