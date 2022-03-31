# @putout/plugin-convert-comparison-to-boolean [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-comparison-to-boolean.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-comparison-to-boolean"npm"

> Strict equality compares two values for equality. Neither value is implicitly converted to some other value before being compared. If the values have different types, the values are considered unequal.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and convert `binary expression` to `boolean`.

## Install

```
npm i @putout/plugin-convert-comparison-to-boolean -D
```

## Rule

```json
{
    "rules": {
        "convert-comparison-to-boolean": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const t = 2 < 3;
```

## ✅ Example of correct code

```js
const t = false;
```

## License

MIT
