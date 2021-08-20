# @putout/plugin-madrun [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-madrun.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-madrun"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-madrun
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-madrun

`putout` plugin adds ability to fix issues with [madrun](https://github.com/coderaiser/madrun) config file.

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
        "madrun/call-run": "on",
        "madrun/convert-run-argument": "on",
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

## ❌ Incorrect code example

```js
module.exports = {
    hello: 'world',
};
```

## ✅ Correct code Example

```js
module.exports = {
    hello: () => 'world',
};
```

# add-fix-lint

## ❌ Incorrect code example

```js
const {run} = require('madrun');

module.exports = {
    lint: 'putout lib test',
};
```

## ✅ Correct code Example

```js
const {run} = require('madrun');

module.exports = {
    'lint': 'putout lib test',
    'fix:lint': run('lint', '--fix'),
};
```

# add-run

## ❌ Incorrect code example

```js
module.exports = {
    lint: 'putout lib test',
};
```

## ✅ Correct code Example

```js
const {run} = require('madrun');

module.exports = {
    lint: 'putout lib test',
};
```

# convert-run-argument

## ❌ Incorrect code example

```js
module.exports = {
    hello: () => run(['a']),
};
```

## ✅ Correct code Example

```js
module.exports = {
    hello: () => run('a'),
};
```

# rename-eslint-to-putout

## ❌ Incorrect code example

```js
module.exports = {
    lint: 'eslint lib test --ignore test/fixture',
};
```

## ✅ Correct code Example

```js
module.exports = {
    lint: 'putout lib test',
};
```

# set-lint-dot

## ❌ Incorrect code example

```js
module.exports = {
    lint: 'putout lib test',
};
```

## ✅ Correct code Example

```js
module.exports = {
    lint: 'putout .',
};
```

# convert-to-async

## ❌ Incorrect code example

```js
module.exports = {
    lint: () => String(run('hello')),
};
```

## ✅ Correct code Example

```js
module.exports = {
    lint: async () => String(await run('hello')),
};
```

# convert-nyc-to-c8

## ❌ Incorrect code example

```js
export default {
    coverage: () => 'nyc npm test',
    report: () => `nyc report --reporter=text-lcov | coveralls`,
};
```

## ✅ Correct code Example

```js
export default {
    coverage: () => 'c8 npm test',
    report: 'c8 report --reporter=lcov',
};
```

# set-report-lcov

## ❌ Incorrect code example

```js
export default {
    'report': () => `c8 report --reporter=text-lcov | coveralls || true`,
};

```

## ✅ Correct code Example

```js
export default {
    report: 'c8 report --reporter=lcov',
};
```

# remove-check-duplicates-from-test

## ❌ Incorrect code example

```js
export default {
    'test': () => 'tape -d *.js',
};

```

## ✅ Correct code Example

```js
export default {
    'test': () => 'tape *.js',
};
```

## License

MIT
