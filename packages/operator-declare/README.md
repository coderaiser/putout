# @putout/operator-declare [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-declare.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-declare "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to declare variables that has references with no definitions. Most likely you prefer using [Declarator](https://github.com/coderaiser/putout/blob/master/packages/engine-runner/README.md#Declarator) plugin type based on current Operator.

## Install

```
npm i putout @putout/operator-declare
```

## API

If you want to create 🐊[**Putout**](https://github.com/coderaiser/putout) `plugin` that will declare variables according to your needs just:

```js
const {operator} = require('putout');
const {declare} = operator;

module.exports = declare({
    fs: `import fs from 'fs/promises'`,
});
```

### Dual packages

When you need different declarations for `ESM` and `CommonJS` you can use:

```js
const {operator} = require('putout');
const {declare} = operator;

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
        "putout/declare": ["on", {
            "declarations": {
                "fs": "import fs from 'fs/promises'"
            }
        }]
    }
}
```

If for some reason you don't need some kind of declaration, add `dismiss` field and it will be ignored:

```json
{
    "rules": {
        "putout/declare": ["on", {
            "declarations": {
                "fs": "import fs from 'fs/promises'"
            },
            "dismiss": ["fs"]
        }]
    }
}
```

If you want to override `type` to avoid detecting, set it to `esm|commonjs`:

```json
{
    "rules": {
        "putout/declare": ["on", {
            "declarations": {
                "fs": "import fs from 'fs/promises'"
            },
            "dismiss": ["fs"],
            "type": "esm"
        }]
    }
}
```

### Used in

- ✅ [declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare#readme)
- ✅ [tape/declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-tape#declare)
- ✅ [putout/declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-putout#declare)
- ✅ [nodejs/declare](https://github.com/coderaiser/putout/blob/master/packages/plugin-montag/#declare)
- ✅ [react-hooks/declare](https://github.com/coderaiser/putout/blob/master/packages/plugin-react-hooks/README.md#declare)
- ✅ [try-catch/declare](https://github.com/coderaiser/putout/blob/master/packages/plugin-try-catch/#declare)
- ✅ [montag/declare](https://github.com/coderaiser/putout/blob/master/packages/plugin-montag/#declare)
- ✅ [madrun/declare](https://github.com/coderaiser/putout/blob/master/packages/plugin-madrun/#declare)
- ✅ [maybe/declare](https://github.com/coderaiser/putout/tree/master/packages/plugin-maybe#declare)

### Evaluate

Can be used with **ESLint's** [putout/evaluate](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout/lib/evaluate#readme):

```json
{
    "rules": {
        "putout/declare": ["on", {
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
