# @putout/plugin-split-nested-destructuring [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-split-nested-destructuring.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-split-nested-destructuring "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to split nested destructuring.

## Install

```
npm i @putout/plugin-split-nested-destructuring -D
```

## Rule

```json
{
    "rules": {
        "split-nested-destructuring": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const {a: {b}} = c;

function f({a: {b}}) {
    console.log(b);
}
```

## ✅ Example of correct code

```js
const {a} = c;
const {b} = a;

function f({a}) {
    const {b} = a;
    console.log(b);
}
```

## License

MIT
