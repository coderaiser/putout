# @putout/plugin-remove-unused-types [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-unused-types.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-unused-types "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-types
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-types

`putout` plugin adds ability to find and remove `unused types`.

## Install

```
npm i @putout/plugin-remove-unused-types -D
```

## Rule

```json
{
    "rules": {
        "remove-unused-types": "on"
    }
}
```

## ❌ Incorrect code example

```js
type n = number;
type s = string;

const x: n = 5;
```

## ✅ Correct code Example

```js
type n = number;

const x: n = 5;
```

## License

MIT

