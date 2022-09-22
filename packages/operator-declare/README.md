# @putout/operator-declare [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-declare.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-declare "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to declare variable that was not defined before.

## Install

```
npm i putout @putout/operator-declare
```

## API

If you want to create 🐊[**Putout**](https://github.com/coderaiser/putout) `plugin` that will declare variables according to your needs just:

```js
const {
    operator,
    declare,
} = require('putout');

module.exports = declare({
    fs: `import fs from 'fs/promises'`,
});
```

### Dual packages

When you need different declarations for `ESM` and `CommonJS` you can use:

```js
const {
    operator,
    declare,
} = require('putout');

module.exports = declare({
    fs: {
        esm: `import fs from 'fs/promises'`,
        comomnjs: `const fs = require('fs')`, // drop when not needed
    },
});
```

### Configuration

Plugin supports options, so you can pass it in `.putout.json`:

```json
{
    "rules": {
        "putout/declare-undefined-variables": ["on", {
            "declarations": {
                "fs": "import fs from 'fs/promises'"
            }
        }]
    }
}
```

### Used in

- ✅ [declare-undefined-variables](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare-undefined-variables#readme)
- ✅ [tape/declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-tape#declare)
- ✅ [putout/declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-putout#declare)

### Evaluate

Can be used with **ESLint's** [putout/evaluate](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout/lib/evaluate#readme):

```json
{
    "rules": {
        "putout/declare-undefined-variables": ["on", {
            "declarations": {
                "superMethod": "import superMethod from '__putout_evaluate: join(`./`, basename(__filename), `.js`)'"
            }
        }]
    }
}
```

If you have a file `index.spec.js`:

```diff
+ import superMethod from './index.js'
superMethod();
```

## License

MIT
