# @putout/plugin-remove-constant-conditions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-constant-conditions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-constant-conditions"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and remove `constant conditions`.

## Install

```
npm i @putout/plugin-remove-constant-conditions -D
```

## Rule

```json
{
    "rules": {
        "remove-constant-conditions": "on"
    }
}
```

## ❌ Incorrect code example

```js
function hi(a) {
    if (2 < 3) {
        console.log('hello');
        console.log('world');
    }
}
```

## ✅ Correct code Example

```js
function hi(b) {
    console.log('hello');
    console.log('world');
}
```

## License

MIT
