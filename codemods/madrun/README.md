# @putout/codemod-madrun [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-madrun.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-madrun"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to fix issues with [madrun](https://github.com/coderaiser/madrun) config file.

Contains old transformations, need have more examples and tests for `putout`.

## Install

```
npm i putout @putout/plugin-madrun -D
```

## Rules

```json
{
    "rules": {
        "madrun/add-madrun-to-lint": "on",
        "madrun/rename-predefined-eslint-to-putout": "on",
        "madrun/add-fresh-lint": "on"
    }
}
```

# add-madrun-to-lint

## ❌ Example of incorrect code

```js
module.exports = {
    lint: () => `eslint lib test --ignore-pattern test/fixture`,
};
```

## ✅ Example of correct code

```js
module.exports = {
    lint: () => `eslint lib test madrun.js --ignore-pattern test/fixture`,
};
```

# rename-predefined-eslint-to-putout

## ❌ Example of incorrect code

```js
const {eslint} = predefined;

module.exports = {
    'lint': () => {
        const names = [
            'bin',
            'lib',
            'test',
            'madrun.js',
        ];
        
        return eslint({names});
    },
};
```

## ✅ Example of correct code

```js
const {putout} = predefined;

module.exports = {
    'lint': () => {
        const names = [
            'bin',
            'lib',
            'test',
            'madrun.js',
        ];
        
        return putout({names});
    },
};
```

# add-fresh-lint

## ❌ Example of incorrect code

```js
const {run} = require('madrun');

module.exports = {
    lint: 'putout lib test',
};
```

## ✅ Example of correct code

```js
const {run} = require('madrun');

module.exports = {
    'lint': 'putout lib test',
    'fresh:lint': run('lint', '--fresh'),
    'lint:fresh': run('lint', '--fresh'),
};
```

## License

MIT
