# @putout/plugin-convert-typeof-to-is-type [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-typeof-to-is-type.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-typeof-to-is-type "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-typeof-to-is-type
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-typeof-to-is-type

`putout` plugin adds ability to convert `typeof` to `is type`.

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

## ❌ Incorrect code example

```js
if (typeof a === 'boolean')
    return x;
```

## ✅ Correct code Example

```js
const isBool = (a) => typeof a === 'boolean';

if (isBool(a))
    return x;
```

## License

MIT
