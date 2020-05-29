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
        "remove-useless-spread/array": true,
        "remove-useless-spread/object": true
    }
}
```

## ❌ Incorrect code example

```js
for (const a of [...b]) {}

const a = {
    ...b
};
```

## ✅ Correct code Example

```js
for (const a of b) {}

const a = b;
```

## License

MIT

