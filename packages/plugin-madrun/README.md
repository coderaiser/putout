# putout-plugin-madrun [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-madrun.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-madrun"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-madrun
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-madrun

`putout` plugin adds ability to fix issues with [madrun](https://github.com/coderaiser/madrun) config file.

## Install

```
npm i putout @putout/plugin-madrun -D
```

Add `.putout.json` with:

```json
{
    "plugins": [
        "madrun"
    ]
}
```

## Rules

```json
{
    "rules": {
        "madrun/add-function": true,
        "madrun/add-fix-lint": true,
        "madrun/add-run": true,
        "madrun/call-run": true,
        "madrun/convert-run-argument": true,
        "madrun/rename-series-to-run": true,
        "madrun/rename-eslint-to-putout": true,
    }
}
```

# add-function

## ❌ Incorrect code example

```js
module.exports = {
    'hello': 'world'
};
```

## ✅ Correct code Example

```js
module.exports = {
    'hello': () => 'world'
};
```
# add-fix-lint-

## ❌ Incorrect code example

```js
const {run} = require('madrun');

module.exports = {
    'lint': 'putout lib test',
};
```

## ✅ Correct code Example

```js
const {run} = require('madrun');

module.exports = {
    'lint': 'putout lib test',
    'fix:lint': run('lint', '--fix'),
};
```

# add-run

## ❌ Incorrect code example

```js
module.exports = {
    'lint': 'putout lib test',
};
```

## ✅ Correct code Example

```js
const {run} = require('madrun');

module.exports = {
    'lint': 'putout lib test',
};
```

# add-madrun-to-lint

## ❌ Incorrect code example

```js
module.exports = {
    'lint': () => `eslint lib test --ignore-pattern test/fixture`,
};
```

## ✅ Correct code Example

```js
module.exports = {
    'lint': () => `eslint lib test madrun.js --ignore-pattern test/fixture`,
};
```

# convert-run-argument

## ❌ Incorrect code example

```js
module.exports = {
    'hello': () => run(['a']),
};
```

## ✅ Correct code Example

```js
module.exports = {
    'hello': () => run('a'),
};
```

# rename-eslint-to-putout

## ❌ Incorrect code example

```js
module.exports = {
    'lint': 'eslint lib test --ignore test/fixture',
};
```

## ✅ Correct code Example

```js
module.exports = {
    'lint': 'putout lib test',
};
```

## License

MIT

