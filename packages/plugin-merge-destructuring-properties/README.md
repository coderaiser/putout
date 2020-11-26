# @putout/plugin-merge-destructuring-properties [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-merge-destructuring-properties.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-merge-destructuring-properties"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-merge-destructuring-properties
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-merge-destructuring-properties

`putout` plugin adds ability to merge destructuring properties.

## Install

```
npm i @putout/plugin-merge-destructuring-properties
```

## Rule

Rule `merge-destructuring-properties` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "merge-destructuring-properties": "off"
    }
}
```

### ❌ Incorrect code example

```js
const {one} = require('numbers');
const {two} = require('numbers');
```

### ✅ Correct code Example

```js
const {
    one,
    two,
} = require('numbers');
```

## License

MIT

