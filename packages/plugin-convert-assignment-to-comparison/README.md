# @putout/plugin-convert-assignment-to-comparison [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-assignment-to-comparison.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-assignment-to-comparison"npm"

> You should almost never have an `if...else` with an assignment like `a = b` as a condition.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert assignment to comparison.

## Install

```
npm i @putout/plugin-convert-assignment-to-comparison -D
```

## Rule

```json
{
    "rules": {
        "convert-assignment-to-comparison": "on"
    }
}
```

## ❌ Example of incorrect code

```js
if (a = b) {
}
```

## ✅ Example of correct code

```js
if (a === b) {
}
```

## License

MIT
