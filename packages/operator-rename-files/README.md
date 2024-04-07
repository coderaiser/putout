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
const {operator} = require('putout');
const {renameFiles} = operator;

module.exports = renameFiles({
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

You can also use [`redlint`](https://github.com/putoutjs/redlint) directly.

## License

MIT
