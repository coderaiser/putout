# @putout/plugin-strict-mode [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-strict-mode.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-strict-mode "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-strict-mode
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-strict-mode

`putout` plugin adds ability to find and remove `useless types`.

## Install

```
npm i @putout/plugin-strict-mode -D
```

## Rule

```json
{
    "rules": {
        "strict-mode/add": "on",
        "strict-mode/remove": "on"
    }
}
```

## ❌ Incorrect code example

```js
'strict mode';

import a from 'b';
```

```js
const a = require('b');
```

## ✅ Correct code Example

```js
import a from 'b';
```

```js
'strict mode';

const a = require('b');
```

## License

MIT

