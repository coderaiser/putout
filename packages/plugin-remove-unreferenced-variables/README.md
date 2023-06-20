# @putout/plugin-remove-unreferenced-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unreferenced-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unreferenced-variables "npm"

> A **variable** is a named reference to a **value**.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Variable)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove **variables** without **references**.

## Install

```
npm i @putout/plugin-remove-unreferenced-variables -D
```

## Rule

```json
{
    "rules": {
        "remove-unreferenced-variables": "on"
    }
}
```

## ❌ Example of incorrect code

```js
let a;
let b;

a = 5;
b = 6;

console.log(a);
```

## ✅ Example of correct code

```js
let a;

a = 5;

console.log(a);
```

## License

MIT
