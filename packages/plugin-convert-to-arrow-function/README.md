# @putout/plugin-convert-to-arrow-function [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-to-arrow-function.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-to-arrow-function"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin convert `anonymous` to `arrow function`.

## Install

```
npm i @putout/plugin-convert-to-arrow-function
```

## Rule

```json
{
    "rules": {
        "convert-to-arrow-function": "on"
    }
}
```

## ❌ Incorrect code example

```js
module.exports = function(a, b) {
};

function x() {
    return function(a) {
        return b;
    };
}
```

## ✅ Correct code Example

```js
module.exports = (a, b) => {
};

function x() {
    return (a) => {
        return b;
    };
}
```

## License

MIT
