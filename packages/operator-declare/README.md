# @putout/operator-declare [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-declare.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-declare"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/operator-declare
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/operator-declare

`putout` operator adds ability to declare variable that was not defined before:

## Install

```
npm i putout @putout/operator-declare
```

## API

If you want to create `putout plugin` that will declare variables according to your needs just:

```js
const {
    operator,
    declare,
} = require('putout');

module.exports = declare({
    fs: `import fs from 'fs/promises'`,
});
```

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

Can be used with [eslint-plugin-putout/evaluate](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout/lib/evaluate):

```
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
