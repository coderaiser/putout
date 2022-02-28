# @putout/plugin-convert-is-nan-to-number-is-nan [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-is-nan-to-number-is-nan.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-is-nan-to-number-is-nan "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `isNaN` to more robust [Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN).

Not bundled because `Number.isNaN` do not try to convert to `Number`, and checks that `isNaN` was a `number` instead.

```js
Number.isNaN('hello');
// returns
false;

isNaN('hello');
// returns
true;
```

## Install

```
npm i @putout/plugin-convert-is-nan-to-number-is-nan -D
```

## Rule

```json
{
    "rules": {
        "convert-is-nan-to-number-is-nan": "on"
    }
}
```

## ❌ Example of incorrect code

```js
if (isNaN(x)) {
    return 'NaN';
}
```

## ✅ Example of correct code

```js
if (Number.isNaN(x)) {
    return 'Number NaN';
}
```

## License

MIT
