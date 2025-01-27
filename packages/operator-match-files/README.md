# @putout/operator-match-files [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-match-files.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-match-files "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to match files to plugins.

## Install

```
npm i putout @putout/operator-match-files
```

## API

If you want to create 🐊[**Putout**](https://github.com/coderaiser/putout) `plugin` that will match files according to your needs just:

```js
const {operator} = require('putout');
const {matchFiles} = operator;
const updateTSConfig = require('../update-tsconfig');

module.exports = matchFiles({
    'tsconfig.json': updateTSConfig,
});
```

This will help in case when `update-tsconfig` is disabled by default:

```js
const updateTSConfig = require('./update-tsconfig');

module.exports.rules = {
    'update-tsconfig': ['off', updateTSConfig],
};
```

And you want to help users avoid updating `.putout.json` config with:

```json
{
    "match": {
        "tsconfig.json": {
            "nextjs/update-tsconfig": "on"
        }
    },
    "plugins": ["nextjs"]
}
```

If you want to pass options use:

```json
{
    "match": {
        "tsconfig.json": {
            "nextjs/update-tsconfig": ["on", {
                "ignore": []
            }]
        }
    },
    "plugins": ["nextjs"]
}
```

Instead of this, [`redlint`](https://github.com/putoutjs/redlint) can be used, it will generate `.filesystem.json` which can be processed by 🐊**Putout**.

### Rename

If you want to save with other name use `->`:

```js
const {operator} = require('putout');
const {matchFiles} = operator;
const updateTSConfig = require('../update-tsconfig');

module.exports = matchFiles({
    'tsconfig.json -> hello.json': updateTSConfig,
});
```

### Matcher

You can even use file matchers:

```json
{
    "rules": {
        "filesystem/convert-json-to-js": ["on", {
            "filename": "package.json"
        }]
    }
}
```

Matchers: `__filename = __name.__ext`

```js
module.exports = matchFiles({
    '__name.json -> __name.js': updateTSConfig,
});
```

### `exclude`

If you want to exclude some files, use:

```js
const {operator} = require('putout');
const {matchFiles} = operator;
const updateTSConfig = require('../update-tsconfig');

module.exports = matchFiles({
    files: {
        '__name.ts -> __name.js': updateTSConfig,
    },
    exclude: ['*.d.ts'],
});
```

### Options

You can also pass `options`:

```js
module.exports = matchFiles({
    '.eslintrc.json -> eslint.config.js': {
        rules: {
            'eslint/declare': {
                type: 'esm',
            },
        },
        plugins: [
            ['eslint/convert-rc-to-flat', rcToFlat],
            ['eslint/declare', declare],
        ],
    },
});
```

### `filename`

You can pass default `filename`, so when no options provided it will be used.

```js
const {operator} = require('putout');
const {matchFiles} = operator;
const updateTSConfig = require('../update-tsconfig');

module.exports = matchFiles({
    filename: '*.d.ts',
    files: {
        '__name.ts -> __name.js': updateTSConfig,
    },
});
```

## License

MIT
