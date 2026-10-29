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
import {operator} from 'putout';
import * as updateTSConfig from '../update-tsconfig';

const {matchFiles} = operator;

export const {
    report,
    scan,
    fix,
} = matchFiles({
    'tsconfig.json': updateTSConfig,
});
```

This will help in case when `update-tsconfig` is disabled by default:

```js
import * as updateTSConfig from './update-tsconfig';

exports;
const rules = {
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
import {operator} from 'putout';
import * as updateTSConfig from '../update-tsconfig';

const {matchFiles} = operator;

export const {
    report,
    scan,
    fix,
} = matchFiles({
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
export const {
    report,
    scan,
    fix,
} = matchFiles({
    '__name.json -> __name.js': updateTSConfig,
});
```

### `exclude`

If you want to exclude some files, use:

```js
import {operator} from 'putout';
import * as updateTSConfig from '../update-tsconfig';

const {matchFiles} = operator;

export const {
    report,
    scan,
    fix,
} = matchFiles({
    files: {
        '__name.ts -> __name.js': updateTSConfig,
    },
    exclude: ['*.d.ts'],
});
```

### Options

You can also pass `options`:

```js
export const {
    report,
    scan,
    fix,
} = matchFiles({
    '.eslintrc.json -> eslint.config.js': {
        rules: {
            'eslint/declare': ['on', {
                type: 'esm',
            }],
        },
        plugins: [
            ['eslint/convert-rc-to-flat', rcToFlat],
            ['eslint/declare', declare],
        ],
    },
});
```

### Printer Options

You can also pass [`printer options`](https://github.com/putoutjs/printer?tab=readme-ov-file#overrides):

```js
export const {
    report,
    scan,
    fix,
} = matchFiles({
    '.eslintrc.json -> eslint.config.js': {
        printer: ['putout', {
            format: {
                indent: '  ',
            },
        }],
        rules: {
            'eslint/declare': ['on', {
                type: 'esm',
            }],
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
import {operator} from 'putout';
import updateTSConfig from '../update-tsconfig';

const {matchFiles} = operator;

export const {
    report,
    scan,
    fix,
} = matchFiles({
    filename: '*.d.ts',
    files: {
        '__name.ts -> __name.js': updateTSConfig,
    },
});
```

## License

MIT
