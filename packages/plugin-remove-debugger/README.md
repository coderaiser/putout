# @putout/plugin-remove-debugger [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-debugger.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-debugger "npm"

`putout` plugin adds ability to find and remove `debugger` statement.

## Install

```
npm i @putout/plugin-remove-debugger
```

## Rule

```json
{
    "rules": {
        "remove-debugger": "on"
    }
}
```

## ❌ Incorrect code example

```js
debugger;
console.log('hello');
```

## ✅ Correct code Example

```js
console.log('hello');
```

## License

MIT
