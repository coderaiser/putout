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

## Rule

```json
{
    "rules": {
        "merge-duplicate-imports": "on"
    }
}
```

## ❌ Example of incorrect code

```js
import test from 'supertape';
import {stub} from 'supertape';
```

## ✅ Example of correct code

```js
import test, {
    stub,
} from 'supertape';
```

## License

MIT
