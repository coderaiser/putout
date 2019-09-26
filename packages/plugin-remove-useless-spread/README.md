# putout-plugin-remove-useless-spread [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-useless-spread.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-useless-spread"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-spread
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-spread

`putout` plugin adds ability to apply shorthand properties.

## Install

```
npm i @putout/plugin-remove-useless-spread
```

## Rule

```json
{
    "rules": {
        "remove-useless-spread": true
    }
}
```

## ❌ Incorrect code example

```js
const places = [
    ...runPlugins(),
];
```

## ✅ Correct code Example

```js
const places = runPlugins();
```

## License

MIT

