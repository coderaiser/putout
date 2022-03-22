# @putout/plugin-remove-double-negations [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-double-negations.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-double-negations"npm"

> To explicitly convert its return value (or any expression in general) to the corresponding boolean value can be used a double NOT operator (`!!`).
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove **double negations** from conditionals.

## Install

```
npm i @putout/plugin-remove-double-negations
```

## Rule

```json
{
    "rules": {
        "remove-double-negations": "off"
    }
}
```

## ❌ Example of incorrect code

```js
if (!!a) {
    console.log('hi');
}
```

## ✅ Example of correct code

```js
if (a) {
    console.log('hi');
}
```

## License

MIT
