# @putout/plugin-group-imports-by-source [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-group-imports-by-source.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-group-imports-by-source "npm"

> The static **import** declaration is used to import read-only live bindings which are exported by another module.
> The imported bindings are called live bindings because they are updated by the module that exported the binding, but cannot be re-assigned by the importing module.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and group `import` statements by source. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/3cc782acf95211f9d456d63a99032ee1/0674223d050bba572f5271ffdccf8616cb441af5).

Group order:

- ✅ builtins;
- ✅ external;
- ✅ internal;

## Install

```
npm i @putout/plugin-group-imports-by-source
```

## Rule

```json
{
    "rules": {
        "group-imports-by-source": "on"
    }
}
```

## ❌ Example of incorrect code

```js
import fs from 'node:fs';
import {lodash} from 'lodash';
import react from 'react';
import d from '../hello.js';
import ss from '../../bb/ss.js';
import b from './ss.js';

const c = 5;
```

## ✅ Example of correct code

```js
import fs from 'node:fs';
import react from 'react';
import {lodash} from 'lodash';
import b from './ss.js';
import d from '../hello.js';
import ss from '../../bb/ss.js';

const c = 5;
```

## License

MIT
