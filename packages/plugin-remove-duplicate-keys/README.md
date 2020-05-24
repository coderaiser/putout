# putout-plugin-remove-duplicate-keys [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-keys.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-duplicate-keys"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-duplicate-keys
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-duplicate-keys

`putout` plugin adds ability to find and remove duplecate keys.

## Install

```
npm i @putout/plugin-remove-duplicate-keys
```

## Rule

```json
{
    "rules": {
        "remove-duplicate-keys": true
    }
}
```

## ❌ Incorrect code example

```js
const a = {
    x: 'hello',
    ...z,
    x: 'world',
};
```

## ✅ Correct code Example

```js
const a = {
    ...z,
    x: 'world',
};
```

## License

MIT

