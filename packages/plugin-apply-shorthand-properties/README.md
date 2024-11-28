# @putout/plugin-apply-shorthand-properties [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-shorthand-properties.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-shorthand-properties "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply shorthand properties.

## Install

```
npm i @putout/plugin-apply-shorthand-properties -D
```

## Config

```json
{
    "rules": {
        "apply-shorthand-properties": ["on", {
            "ignore": [],
            "rename": false
        }]
    },
    "plugins": [
        "apply-shorthand-properties"
    ]
}
```

## With default options

### ❌ Example of incorrect code

```js
import {'b' as b} from 'b';

const {a: a} = b;
```

### ✅ Example of correct code

```js
import {b} from 'b';

const {a} = b;
```

## When `rename` enabled

### ❌ Example of incorrect code

```js
const AUTH_SESSION = 'xx';

export const setSession = (session) => ({
    type: AUTH_SESSION,
    payload: session,
});
```

### ✅ Example of correct code

```js
const type = 'xx';

export const setSession = (payload) => ({
    type,
    payload,
});
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`apply-shorthand-properties`](https://github.com/coderaiser/putout/tree/master/packages/plugin-apply-shorthand-properties#readme) | ✅
⏣ **ESLint** | [`no-useless-rename`](https://eslint.org/docs/rules/no-useless-rename) | ❌

## License

MIT
