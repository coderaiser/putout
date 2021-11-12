# @putout/plugin-apply-if-condition [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-if-condition.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-if-condition"npm"

`putout` plugin adds ability to apply `if condition`

## Install

```
npm i @putout/plugin-apply-if-condition
```

## Rule

Rule `apply-if-condition`:

## Rule

```json
{
    "rules": {
        "apply-if-condition": "on"
    }
}
```

## ❌ Incorrect code example

```js
if (2 > 3);
    alert();
```

## ✅ Correct code Example

```js
if (2 > 3)
    alert();
```

## License

MIT
