# @putout/plugin-nodejs [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-nodejs.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-nodejs"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to transform to new [nodejs.org](https://nodejs.io) API and best practices.

## Install

```
npm i putout @putout/plugin-nodejs -D
```

## Options

```json
{
    "rules": {
        "nodejs/convert-fs-promises": "on",
        "nodejs/convert-promisify-to-fs-promises": "on",
        "nodejs/convert-dirname-to-url": "on",
        "nodejs/remove-process-exit": "on"
    }
}
```

## Rules

### convert-fs-promises

Convert [fs.promises](https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_fs_promises_api) into form that will be simpler to use and convert from in `ESM` to:

```
import {readFile} from 'fs/promises';
```

#### ❌ Incorrect code example

```js
const {readFile} = require('fs').promises;
```

#### ✅ Correct code Example

```js
const {readFile} = require('fs/promises');
```

### convert-promisify-to-fs-promises

#### ❌ Incorrect code example

```js
const fs = require('fs');
const readFile = promisify(fs.readFile);
```

#### ✅ Correct code Example

```js
const {readFile} = require('fs/promises');
```

### convert-dirname-to-url

Only for `EcmaScript Modules`.

#### ❌ Incorrect code example

```js
import {readFile} from 'fs/promises';

const file1 = join(__dirname, '../../package.json');
const file2 = path.join(__dirname, '../../package.json');
```

#### ✅ Correct code Example

```js
import {readFile} from 'fs/promises';

const file1 = new URL('../../package.json', import.meta.url);
const file2 = new URL('../../package.json', import.meta.url);
```

### remove-process-exit

In most cases `process.exit()` is called from `bin` directory, if not - disable this rule using `match`.

```diff
-process.exit();
```

## License

MIT
