# @putout/eslint-flat [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/eslint-flat.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/eslint-flat "npm"

Read `.putout.json` and convert `rules`  into `match`.

## Install

```
npm i @putout/eslint-flat
```

## API

### `matchToFlat(match)`

You have ability to write **ESLint** configs in objects instead of lots of arrays, for example instead of this:

```js
module.exports = [
    ...safeAlign, {
        files: ['bin/putout.mjs'],
        rules: {
            'n/hashbang': 'off',
        },
    }, {
        files: ['**/register.mjs'],
        rules: {
            'n/no-unsupported-features/node-builtins': 'off',
        },
    },
];
```

You can use `matchToFlat`:

```js
const {matchToFlat} = require('@putout/eslint-flat');
const {safeAlign} = require('eslint-plugin-putout/config');

const match = {
    'bin/putout.mjs': {
        'n/hashbang': 'off',
    },
    '**/register.mjs': {
        'n/no-unsupported-features/node-builtins': 'off',
    },
};

module.exports = [
    ...safeAlign,
    ...matchToFlat(match),
];

module.exports.match = match;
```

This also gives you ability to use new configs in monorepo:

### matchToFlatDir(path)

If yourc `eslint.config.js` exports `match`, you can use `matchToFlatDir` to build correct `files` arrays:

```js
const {safeAlign} = require('eslint-plugin-putout/config');
const {matchToFlatDir} = require('@putout/eslint-flat');

module.exports = [
    ...safeAlign,
    ...matchToFlatDir('./packages/putout'),
];
```

This is the same as:

```js
module.exports = [
    ...safeAlign, {
        files: ['**/packages/putout/bin/putout.mjs'],
        rules: {
            'n/hashbang': 'off',
        },
    }, {
        files: ['**/packages/putout/**/register.mjs'],
        rules: {
            'n/no-unsupported-features/node-builtins': 'off',
        },
    },
];
```

## License

MIT
