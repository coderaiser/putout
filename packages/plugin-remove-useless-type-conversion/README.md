# @putout/plugin-remove-useless-type-conversion [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-type-conversion.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-type-conversion "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to apply shorthand properties.

## Install

```
npm i @putout/plugin-remove-useless-type-conversion
```

## Rule

```json
{
    "rules": {
        "remove-useless-type-conversion/named": "on",
        "remove-useless-type-conversion/with-double-negations": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const a = !![1].includes(1);
const b = Boolean([1].includes(1));
```

## ✅ Example of correct code

```js
const a = [1].includes(1);
```

## License

MIT
