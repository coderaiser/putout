# @putout/codemod-madrun [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-madrun.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-madrun"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-madrun
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-madrun

`putout` plugin adds ability to fix issues with [madrun](https://github.com/coderaiser/madrun) config file.

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
        "madrun/rename-predefined-eslint-to-putout": "on"
    }
}
```

# add-madrun-to-lint

## ❌ Incorrect code example

```js
module.exports = {
    lint: () => `eslint lib test --ignore-pattern test/fixture`,
};
```

## ✅ Correct code Example

```js
module.exports = {
    lint: () => `eslint lib test madrun.js --ignore-pattern test/fixture`,
};
```

# rename-predefined-eslint-to-putout

## ❌ Incorrect code example

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

## ✅ Correct code Example

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

## License

MIT
