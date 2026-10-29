# @putout/eslint-flat [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/eslint-flat.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/eslint-flat "npm"

Helps deal with **ESLint** FlatConfig.

## Install

```
npm i @putout/eslint-flat
```

## API

### `matchToFlat(match)`

You have ability to write **ESLint** configs in objects instead of lots of arrays, for example instead of this:

```js
export default [
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
import {matchToFlat} from '@putout/eslint-flat';
import {safeAlign} from 'eslint-plugin-putout/config';

export const match = {
    'bin/putout.mjs': {
        'n/hashbang': 'off',
    },
    '**/register.mjs': {
        'n/no-unsupported-features/node-builtins': 'off',
    },
};

export default [
    ...safeAlign,
    ...matchToFlat(match),
];
```

This also gives you ability to use new configs in monorepo:

### `matchToFlatDir(cwd: DirName|FileURL, path)`

If your `eslint.config.js` exports `match`, you can use `matchToFlatDir` to build correct `files` arrays:

```js
import {safeAlign} from 'eslint-plugin-putout/config';
import {matchToFlatDir} from '@putout/eslint-flat';

export default [
    ...safeAlign,
    ...matchToFlatDir(__dirname, './packages/putout'),
];
```

or

```js
import {safeAlign} from 'eslint-plugin-putout/config';
import {matchToFlatDir} from '@putout/eslint-flat';

export default [
    ...safeAlign,
    ...matchToFlatDir(import.meta.url, './packages/putout'),
];
```

This is the same as:

```js
export default [
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
        ignores: [
            ['**/packages/putout/**/fixture'],
        ],
    },
];
```

### `mergeESLintConfigs(cwd, directories)`

When you have monorepo with lots of packages in `./packages` directory:

```js
import {safeAlign} from 'eslint-plugin-putout/config';
import {mergeESLintConfigs} from '@putout/eslint-flat';

const config = await mergeESlintConfigs(import.meta.url, ['./packages']);

export default [
    ...safeAlign,
    ...config,
];
```

### `createESLintConfig(configs)`

Gives ability to avoid lots of spreads (alias to [`defineConfig`](https://eslint.org/blog/2025/03/flat-config-extends-define-config-global-ignores/):

```js
export default createESLintConfig([safeAlign, config]);
```

## License

MIT
