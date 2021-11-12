# @putout/plugin-apply-shorthand-properties [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-shorthand-properties.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-shorthand-properties "npm"

`putout` plugin adds ability to apply shorthand properties.

## Install

```
npm i @putout/plugin-apply-shorthand-properties -D
```

## Config

```json
{
    "rules": {
        "apply-shorthand-properties": ["on", {
            "ignore": []
        }]
    },
    "plugins": [
        "apply-shorthand-properties"
    ]
}
```

## ❌ Incorrect code example

```js
const AUTH_SESSION = 'xx';

export const setSession = (session) => ({
    type: AUTH_SESSION,
    payload: session,
});
```

## ✅ Correct code Example

```js
const type = 'xx';

export const setSession = (payload) => ({
    type,
    payload,
});
```

## License

MIT
