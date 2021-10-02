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

## License

MIT
