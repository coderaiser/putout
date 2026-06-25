# @putout/plugin-madrun [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-madrun.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-madrun "npm"

> CLI tool to run multiple npm-scripts in a madly comfortable way.
>
> (c) [**Madrun**](https://github.com/coderaiser/madrun)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to fix issues with**Madrun** config file.

## Install

```
npm i putout @putout/plugin-madrun -D
```

## Rules

- ✅ [add-cut-env](#add-cut-env);
- ✅ [add-fix-lint](#add-fix-lint);
- ✅ [add-function](#add-function);
- ✅ [add-missing-quotes-to-watcher](#add-missing-quotes-to-watcher);
- ✅ [add-run](#add-run);
- ✅ [call-run](#call-run);
- ✅ [convert-args-to-scripts](#convert-args-to-scripts);
- ✅ [convert-cut-env-to-run](#convert-cut-env-to-run);
- ✅ [convert-lint-lib](#convert-lint-lib);
- ✅ [convert-nyc-to-c8](#convert-nyc-to-c8)
- ✅ [convert-run-argument](#convert-run-argument);
- ✅ [convert-run-to-cut-env](#convert-run-to-cut-env);
- ✅ [convert-prepublish-only-to-wisdom](#convert-prepublish-only-to-wisdom);
- ✅ [convert-to-async](#convert-to-async);
- ✅ [declare](#declare);
- ✅ [remove-check-duplicates-from-test](#remove-check-duplicates-from-test);
- ✅ [remove-putout](#remove-putout);
- ✅ [remove-useless-array-in-run](#remove-useless-array-in-run);
- ✅ [remove-useless-string-conversion](#remove-useless-string-conversion);
- ✅ [rename-eslint-to-putout](#rename-eslint-to-putout);
- ✅ [rename-series-to-run](#rename-series-to-run);
- ✅ [set-lint-dot](#set-lint-dot);
- ✅ [set-report-lcov](#set-report-lcov);

## File rules

- ✅ [rename-file](#rename-file);

## Config

```json
{
    "rules": {
        "madrun/add-function": "on",
        "madrun/add-fix-lint": "on",
        "madrun/add-run": "on",
        "madrun/add-missing-quotes-to-watcher": "on",
        "madrun/add-cut-env": "on",
        "madrun/call-run": "on",
        "madrun/convert-run-argument": "on",
        "madrun/convert-args-to-scripts": "on",
        "madrun/convert-run-to-cut-env": "on",
        "madrun/convert-cut-env-to-run": "on",
        "madrun/convert-prepublish-only-to-wisdom": "on",
        "madrun/rename-file": "off",
        "madrun/rename-series-to-run": "on",
        "madrun/rename-eslint-to-putout": "on",
        "madrun/set-lint-dot": "on",
        "madrun/convert-to-async": "on",
        "madrun/convert-nyc-to-c8": "on",
        "madrun/set-report-lcov": "on",
        "madrun/remove-check-duplicates-from-test": "on",
        "madrun/remove-useless-array-in-run": "on",
        "madrun/remove-useless-string-conversion": "on"
    }
}
```

## add-function

### ❌ Example of incorrect code

```js
module.exports = {
    hello: 'world',
};
```

### ✅ Example of correct code

```js
module.exports = {
    hello: () => 'world',
};
```

## add-fix-lint

### ❌ Example of incorrect code

```js
const {run} = require('madrun');

module.exports = {
    lint: 'putout lib test',
};
```

### ✅ Example of correct code

```js
const {run} = require('madrun');

module.exports = {
    'lint': 'putout lib test',
    'fix:lint': run('lint', '--fix'),
};
```

## add-missing-quotes-to-watcher

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/cf8431088953395b51e827f005c66d2c/dffe20ab71d35eb70aebe191f27c8d34224fa8a4).

### ❌ Example of incorrect code

```js
export default {
    'watch:test': async () => await run('watcher', await run('test')),
};
```

### ✅ Example of correct code

```js
export default {
    'watch:test': async () => await run('watcher', `"${await run('test')}"`),
};
```

## add-run

### ❌ Example of incorrect code

```js
module.exports = {
    lint: 'putout lib test',
};
```

### ✅ Example of correct code

```js
const {run} = require('madrun');

module.exports = {
    lint: 'putout lib test',
};
```

## add-cut-env

### ❌ Example of incorrect code

```js
export default {
    'test': () => [env, 'test:only'],
    'test:only': () => [env, 'npm test'],
};
```

### ✅ Example of correct code

```js
import {cutEnv} from 'madrun';

export default {
    'test': async () => [testEnv, await cutEnv('test:only')],
    'test:only': () => [env, 'npm test'],
};
```

## convert-run-argument

### ❌ Example of incorrect code

```js
module.exports = {
    hello: () => run(['a']),
};
```

### ✅ Example of correct code

```js
module.exports = {
    hello: () => run('a'),
};
```

## convert-args-to-scripts

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/bc9afe77c9853716392f812b5000fbbb/e290c6d41f8a31c81ce4b81e1c1ccec78a319e27).

### ❌ Example of incorrect code

```js
export default {
    build: () => 'tsup',
    wisdom: () => run('build', 'test', 'test:dts'),
};
```

### ✅ Example of correct code

```js
export default {
    build: () => 'tsup',
    wisdom: () => run(['build', 'test', 'test:dts']),
};
```

## convert-run-to-cut-env

### ❌ Example of incorrect code

```js
export default {
    'test': () => [env, 'npm test'],
    'test:only': () => 'npm test',
    'coverage': async () => [env, await run('test')],
    'coverage:only': async () => [env, await run('test:only')],
};
```

### ✅ Example of correct code

```js
export default {
    'test': () => [env, 'npm test'],
    'test:only': () => 'npm test',
    'coverage': async () => [env, await cutEnv('test')],
    'coverage:only': async () => [env, await run('test:only')],
};
```

## convert-cut-env-to-run

### ❌ Example of incorrect code

```js
export default {
    'test': () => [env, 'npm test'],
    'test:only': () => 'npm test',
    'coverage': async () => [env, await cutEnv('test')],
    'coverage:only': async () => [env, await cutEnv('test:only')],
};
```

### ✅ Example of correct code

```js
export default {
    'test': () => [env, 'npm test'],
    'test:only': () => 'npm test',
    'coverage': async () => [env, await cutEnv('test')],
    'coverage:only': async () => [env, await run('test:only')],
};
```

## convert-prepublish-only-to-wisdom

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/cddcdafd9ea8e040f73d52db81967a08/547fb42bdf4c4f46510488382202b0e23c5f9770).

### ❌ Example of incorrect code

```js
export default {
    'prepublishOnly': () => run(['lint', 'test']),
    'test:dts': 'check-dts test/*.ts',
};
```

### ✅ Example of correct code

```js
export default {
    'wisdom': () => run(['lint', 'test']),
    'test:dts': 'check-dts test/*.ts',
};
```

## rename-eslint-to-putout

### ❌ Example of incorrect code

```js
module.exports = {
    lint: 'eslint lib test --ignore test/fixture',
};
```

### ✅ Example of correct code

```js
module.exports = {
    lint: 'putout lib test',
};
```

## rename-file

Rename `madrun.js` to `.madrun.js` when located near `package.json`.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9ad3c6ce273e4da4f0ff5dad8f611e98/9c6ed0b661ee7361919b14ec2a7f7666098e9199).

```
-madrun.js
+.madrun.js
```

## set-lint-dot

### ❌ Example of incorrect code

```js
module.exports = {
    lint: 'putout lib test',
};
```

### ✅ Example of correct code

```js
module.exports = {
    lint: 'putout .',
};
```

## convert-to-async

### ❌ Example of incorrect code

```js
module.exports = {
    lint: () => String(run('hello')),
};
```

### ✅ Example of correct code

```js
module.exports = {
    lint: async () => String(await run('hello')),
};
```

## convert-nyc-to-c8

### ❌ Example of incorrect code

```js
export default {
    coverage: () => 'nyc npm test',
    report: () => `nyc report --reporter=text-lcov | coveralls`,
};
```

### ✅ Example of correct code

```js
export default {
    coverage: () => 'c8 npm test',
    report: 'c8 report --reporter=lcov',
};
```

## set-report-lcov

### ❌ Example of incorrect code

```js
export default {
    report: () => `c8 report --reporter=text-lcov | coveralls || true`,
};
```

### ✅ Example of correct code

```js
export default {
    report: 'c8 report --reporter=lcov',
};
```

## remove-check-duplicates-from-test

### ❌ Example of incorrect code

```js
export default {
    test: () => 'tape -d *.js',
};
```

### ✅ Example of correct code

```js
export default {
    test: () => 'tape *.js',
};
```

## remove-useless-array-in-run

Checkout in [🐊**Putout Editor**](https://putout.cloudcmd.io/#/gist/84c7838a6099a281a370809e51997212/356cbf9050bee7205eb670aa807b336fc28340f7).

### ❌ Example of incorrect code

```js
export default {
    time: async () => await run(['lint:fresh', '-f time']),
};
```

### ✅ Example of correct code

```js
export default {
    time: async () => await run('lint:fresh', '-f time'),
};
```

## remove-useless-string-conversion

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/6fd51ff9244bda07919ddacfb07d32d2/4c4ed5336c1bbef6fba47ff61f3558a87435443c).

### ❌ Example of incorrect code

```js
export default {
    time: async () => [testEnv, String(await cutEnv('test:raw'))],
};
```

### ✅ Example of correct code

```js
export default {
    time: async () => [testEnv, await cutEnv('test:raw')],
};
```

## declare

### ❌ Example of incorrect code

```js
export default {
    coverage: async () => [env, `c8 ${await cutEnv('test')}`],
};
```

### ✅ Example of correct code

```js
import {cutEnv} from 'madrun';

export default {
    coverage: async () => [env, `c8 ${await cutEnv('test')}`],
};
```

## License

MIT
