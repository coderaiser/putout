# @putout/plugin-merge-if-statements [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-merge-if-statements.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-merge-if-statements "npm"

> The `if` statement executes a statement `if` a specified condition is truthy.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to merge `if` statements.

## Install

```
npm i @putout/plugin-merge-if-statements
```

## Rule

```json
{
    "rules": {
        "merge-if-statements": "on"
    }
}
```

## ❌ Example of incorrect code

```js
if (a > b) {
    if (b < c) {
        console.log('hello');
    }
}
```

## ✅ Example of correct code

```js
if (a > b && b < c) {
    console.log('hello');
}
```

## License

MIT
