# putout-plugin-merge-duplicate-imports [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-merge-duplicate-imports.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-merge-duplicate-imports "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-merge-duplicate-imports
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-merge-duplicate-imports

`putout` plugin adds ability to find and remove duplecate keys.

## Install

```
npm i @putout/plugin-merge-duplicate-imports
```

## Rule

```json
{
    "rules": {
        "merge-duplicate-imports": true
    }
}
```

## ❌ Incorrect code example

```js
import {m as b} from 'y';
import {z} from 'y';

import x from 'y';
```

## ✅ Correct code Example

```js
import x, {m as b, z} from 'y';
```

## License

MIT

