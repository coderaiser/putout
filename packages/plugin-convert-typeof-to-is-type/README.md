# @putout/plugin-convert-typeof-to-is-type [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-typeof-to-is-type.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-typeof-to-is-type "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `typeof` to `is type`.

## Install

```
npm i @putout/plugin-convert-typeof-to-is-type -D
```

## Rule

```json
{
    "rules": {
        "convert-typeof-to-is-type": "on"
    }
}
```

## ❌ Example of incorrect code

```js
if (typeof a === 'boolean')
    return x;
```

## ✅ Example of correct code

```js
const isBool = (a) => typeof a === 'boolean';

if (isBool(a))
    return x;
```

## License

MIT
