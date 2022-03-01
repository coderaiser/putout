# @putout/plugin-madrun [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-madrun.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-madrun"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to fix issues with [madrun](https://github.com/coderaiser/madrun) config file.

## Install

```
npm i putout @putout/plugin-madrun -D
```

## Rules

```json
{
    "rules": {
        "madrun/add-function": "on",
        "madrun/add-fix-lint": "on",
        "madrun/add-run": "on",
        "madrun/add-cut-env": "on",
        "madrun/call-run": "on",
        "madrun/convert-run-argument": "on",
        "madrun/convert-run-to-cut-env": "on",
        "madrun/convert-cut-env-to-run": "on",
        "madrun/rename-series-to-run": "on",
        "madrun/rename-eslint-to-putout": "on",
        "madrun/set-lint-dot": "on",
        "madrun/convert-to-async": "on",
        "madrun/convert-nyc-to-c8": "on",
        "madrun/set-report-lcov": "on",
        "madrun/remove-check-duplicates-from-test": "on"
    }
}
```

# add-function

## ❌ Example of incorrect code

```js
module.exports = {
    hello: 'world',
};
```

## ✅ Example of correct code

```js
module.exports = {
    hello: () => 'world',
};
```

# add-fix-lint

## ❌ Example of incorrect code

```js
const {run} = require('madrun');

module.exports = {
    lint: 'putout lib test',
};
```

## ✅ Example of correct code

```js
const {run} = require('madrun');

module.exports = {
    'lint': 'putout lib test',
    'fix:lint': run('lint', '--fix'),
};
```

# add-run

## ❌ Example of incorrect code

```js
module.exports = {
    lint: 'putout lib test',
};
```

## ✅ Example of correct code

```js
const {run} = require('madrun');

module.exports = {
    lint: 'putout lib test',
};
```

# add-cut-env

## ❌ Example of incorrect code

```js
export default {
    'test': () => [env, 'test:only'],
    'test:only': () => [env, 'npm test'],
};
```

## ✅ Example of correct code

```js
import {cutEnv} from 'madrun';

export default {
    'test': async () => [testEnv, await cutEnv('test:only')],
    'test:only': () => [env, 'npm test'],
};
```

# convert-run-argument

## ❌ Example of incorrect code

```js
module.exports = {
    hello: () => run(['a']),
};
```

## ✅ Example of correct code

```js
module.exports = {
    hello: () => run('a'),
};
```

# convert-run-to-cut-env

## ❌ Example of incorrect code

```js
export default {
    'test': () => [env, 'npm test'],
    'test:only': () => 'npm test',
    'coverage': async () => [env, await run('test')],
    'coverage:only': async () => [env, await run('test:only')],
};
```

## ✅ Example of correct code

```js
export default {
    'test': () => [env, 'npm test'],
    'test:only': () => 'npm test',
    'coverage': async () => [env, await cutEnv('test')],
    'coverage:only': async () => [env, await run('test:only')],
};
```

# convert-cut-env-to-run

## ❌ Example of incorrect code

```js
export default {
    'test': () => [env, 'npm test'],
    'test:only': () => 'npm test',
    'coverage': async () => [env, await cutEnv('test')],
    'coverage:only': async () => [env, await cutEnv('test:only')],
};
```

## ✅ Example of correct code

```js
export default {
    'test': () => [env, 'npm test'],
    'test:only': () => 'npm test',
    'coverage': async () => [env, await cutEnv('test')],
    'coverage:only': async () => [env, await run('test:only')],
};
```

# rename-eslint-to-putout

## ❌ Example of incorrect code

```js
module.exports = {
    lint: 'eslint lib test --ignore test/fixture',
};
```

## ✅ Example of correct code

```js
module.exports = {
    lint: 'putout lib test',
};
```

# set-lint-dot

## ❌ Example of incorrect code

```js
module.exports = {
    lint: 'putout lib test',
};
```

## ✅ Example of correct code

```js
module.exports = {
    lint: 'putout .',
};
```

# convert-to-async

## ❌ Example of incorrect code

```js
module.exports = {
    lint: () => String(run('hello')),
};
```

## ✅ Example of correct code

```js
module.exports = {
    lint: async () => String(await run('hello')),
};
```

# convert-nyc-to-c8

## ❌ Example of incorrect code

```js
export default {
    coverage: () => 'nyc npm test',
    report: () => `nyc report --reporter=text-lcov | coveralls`,
};
```

## ✅ Example of correct code

```js
export default {
    coverage: () => 'c8 npm test',
    report: 'c8 report --reporter=lcov',
};
```

# set-report-lcov

## ❌ Example of incorrect code

```js
export default {
    report: () => `c8 report --reporter=text-lcov | coveralls || true`,
};

```

## ✅ Example of correct code

```js
export default {
    report: 'c8 report --reporter=lcov',
};
```

# remove-check-duplicates-from-test

## ❌ Example of incorrect code

```js
export default {
    test: () => 'tape -d *.js',
};

```

## ✅ Example of correct code

```js
export default {
    test: () => 'tape *.js',
};
```

# declare

## ❌ Example of incorrect code

```js
export default {
    coverage: async () => [env, `c8 ${await cutEnv('test')}`],
};

```

## ✅ Example of correct code

```js
import {cutEnv} from 'madrun';
export default {
    coverage: async () => [env, `c8 ${await cutEnv('test')}`],
};
```

## License

MIT
