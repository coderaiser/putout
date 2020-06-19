# putout-plugin-reuse-duplicate-init [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-reuse-duplicate-init.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-reuse-duplicate-init "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-reuse-duplicate-init
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-reuse-duplicate-init

`putout` plugin adds ability to reuse duplicate init.
## Install

```
npm i @putout/plugin-reuse-duplicate-init -D
```

## Rule

```json
{
    "rules": {
        "reuse-duplicate-init": true
    }
}
```

## ❌ Incorrect code example

```js
const putout = require('putout');
const {a, b} = require('putout');
```

## ✅ Correct code Example

```js
const putout = require('putout');
const {a, b} = putout;
```

## License

MIT

