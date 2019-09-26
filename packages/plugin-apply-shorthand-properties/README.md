# putout-plugin-apply-shorthand-properties [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-apply-shorthand-properties.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-apply-shorthand-properties"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-shorthand-properties
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-shorthand-properties

`putout` plugin adds ability to apply shorthand properties.

## Install

```
npm i @putout/plugin-apply-shorthand-properties
```

## Rule

```json
{
    "rules": {
        "apply-shorthand-properties": ["on", {
            "ignore": []
        }]
    }
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

