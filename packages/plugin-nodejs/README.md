# @putout/plugin-nodejs [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-nodejs.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-nodejs "npm"

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
        "nodejs/convert-url-to-dirname": "on",
        "nodejs/convert-top-level-return": "on",
        "nodejs/remove-process-exit": "on"
    }
}
```

## Rules

### convert-fs-promises

Convert [fs.promises](https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_fs_promises_api) into form that will be simpler to use and convert from in `ESM` to:

#### ❌ Example of incorrect code

```js
const {readFile} = require('fs').promises;
```

#### ✅ Example of correct code

```js
const {readFile} = require('fs/promises');
```

### convert-promisify-to-fs-promises

#### ❌ Example of incorrect code

```js
const fs = require('fs');
const readFile = promisify(fs.readFile);
```

#### ✅ Example of correct code

```js
const {readFile} = require('fs/promises');
```

### convert-dirname-to-url

Only for `EcmaScript Modules`.

#### ❌ Example of incorrect code

```js
import {readFile} from 'fs/promises';

const file1 = join(__dirname, '../../package.json');
const file2 = path.join(__dirname, '../../package.json');
```

#### ✅ Example of correct code

```js
import {readFile} from 'fs/promises';

const file1 = new URL('../../package.json', import.meta.url);
const file2 = new URL('../../package.json', import.meta.url);
```

### convert-dirname-to-url

Only for `CommonJS`.

#### ❌ Example of incorrect code

```js
const {readFile} = require('fs/promises');
const file = new URL('../../package.json', import.meta.url);
```

#### ✅ Example of correct code

```js
const {readFile} = require('fs/promises');
const file = join(__dirname, '../../package.json');
```

### remove-process-exit

In most cases `process.exit()` is called from `bin` directory, if not - disable this rule using `match`.

```diff
-process.exit();
```

### convert-top-level-return

#### ❌ Example of incorrect code

```js
return;
```

#### ✅ Example of correct code

```js
process.exit();
```

## License

MIT
