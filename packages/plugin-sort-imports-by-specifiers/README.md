# @putout/plugin-sort-imports-by-specifiers [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-sort-imports-by-specifiers.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-sort-imports-by-specifiers "npm"

> The static **import** declaration is used to import read-only live bindings which are exported by another module.
> The imported bindings are called live bindings because they are updated by the module that exported the binding, but cannot be re-assigned by the importing module.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and sort `import` statements by specifiers. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/521e2ff199243a7ce1f65db7140c272e/28c0588281286f8a6765b8aa2ecabbfcde2973a7).

## Install

```
npm i @putout/plugin-sort-imports-by-specifiers
```

## Rule

```json
{
    "rules": {
        "sort-imports-by-specifiers": "on"
    }
}
```

## ❌ Example of incorrect code

```js
import {
    a,
    b,
    c,
    d,
} from 'd';
import a1 from 'a1';
```

## ✅ Example of correct code

```js
import a1 from 'a1';
import {
    a,
    b,
    c,
    d,
} from 'd';
```

## License

MIT
