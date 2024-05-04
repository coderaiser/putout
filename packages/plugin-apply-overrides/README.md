# @putout/plugin-apply-overrides [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-overrides.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-overrides "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply `overrides`.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2f03cfd6d8dab1431ef388fb9168a017/098a08fd5ba26e5b7dc12e3adcd9766dce6aca0c).

When you write testable code and want to avoid mocking `require`d or `import`ed modules, one of a solutions to use simple form
of dependency injection:

```js
import {readDirSync as _readdirSync} from 'node:fs/promises';

export const readRules = (dirOpt, rulesDir, overrides = {}) => {
    const {
        cwd,
        readdirSync = _readdirSync,
    } = overrides;
};
```

Pass `overrides` as last parameter, in this case use can test easily your function `readFules`:

```js
import {test, stub} from 'supertape';

test('readRules', (t) => {
    const readdirSync = stub().returns([]);
    const rules = readRules('', '', {
        readdirSync,
    });
    
    t.equal(rules, []);
    t.end();
});
```

Then only issue is, when you have lots of parameters, your function declaration will be to long, or to hard to read, so recommended way is to use `overrides` variable.

## Install

```
npm i @putout/plugin-apply-overrides
```

## Rule

```json
{
    "rules": {
        "apply-overrides": "on"
    }
}
```

## ❌ Example of incorrect code

```js
async function matchToFlatDir(path, config, {readESLintConfig = _readESLintConfig} = {}) {}
```

## ✅ Example of correct code

```js
async function matchToFlatDir(path, config, overrides = {}) {
    const {
        readESLintConfig = _readESLintConfig,
    } = overrides;
}
```

## License

MIT
