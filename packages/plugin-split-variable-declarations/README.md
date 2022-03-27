# @putout/plugin-split-variable-declarations [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-split-variable-declarations.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-split-variable-declarations "npm"

> - The [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) statement declares a block-scoped local variable, optionally initializing it to a value.
> - [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) statements are also block-scoped. The value of a constant can't be changed through reassignment, and it can't be redeclared. However, if a constant is an **object** or **array** its properties or items can be updated or removed.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and split variable declarations because (re)moving a line is simpler and less error prone then changing coma (`,`) to colon (`;`).

For the same reason, **diff** of changed declarations are more comfortable to read.

## Install

```
npm i @putout/plugin-split-variable-declarations
```

## Rule

```json
{
    "rules": {
        "split-variable-declarations": "on"
    }
}
```

## ❌ Example of incorrect code

```js
let a, b;
```

## ✅ Example of correct code

```js
let a;
let b;
```

## License

MIT
