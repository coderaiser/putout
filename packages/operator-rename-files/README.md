# @putout/operator-rename-files [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-rename-files.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-rename-files "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to rename files to plugins.

## Install

```
npm i putout @putout/operator-rename-files
```

## API

If you want to create 🐊[**Putout**](https://github.com/coderaiser/putout) `plugin` that will rename files according to your needs just use for **ESM**:

```js
import {operator} from 'putout';

const {renameFiles} = operator;

export const {
    report,
    fix,
    scan,
} = renameFiles({
    type: 'module',
    mask: '*.mjs',
    rename(name) {
        return name.replace(/mjs$/, 'js');
    },
});
```

And for **CommonJS**:

```js
module.exports = renameFiles({
    type: 'commonjs',
    mask: '*.cjs',
    rename(name) {
        return name.replace(/cjs$/, 'js');
    },
});
```

When you do not need to check `type` field of `package.json`, avoid `type` field:

```js
module.exports = renameFiles({
    mask: '*.cjs',
    rename(name) {
        return name.replace(/cjs$/, 'js');
    },
});
```

### renameFiles(mask, from, to)

You can pass `from` and `to` instead of `rename` for declarative renaming.

```js
export const {
    report,
    fix,
    scan,
} = renameFiles({
    mask: '*.spec.*',
    from: 'spec',
    to: 'test',
});
```

You can also use [`redlint`](https://github.com/putoutjs/redlint) directly.

## License

MIT
