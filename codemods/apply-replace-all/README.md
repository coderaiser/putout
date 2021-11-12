# @putout/plugin-apply-replace-all [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-replace-all.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-replace-all "npm"

`putout` plugin adds ability to find and remove `useless functions`.

## Install

```
npm i @putout/plugin-apply-replace-all -D
```

## Rule

```json
{
    "rules": {
        "apply-replace-all": "on"
    }
}
```

## Rename

### ❌ Incorrect code example

```js
'h*ll*'.replace('*', 'x');
```

### ✅ Correct code Example

```js
'h*ll*'.replace(/\*/g, 'x');
```

## License

MIT
