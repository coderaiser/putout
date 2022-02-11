# @putout/plugin-apply-early-return [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-early-return.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-early-return"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to apply early return.

## Install

```
npm i @putout/plugin-apply-early-return
```

## Rule

```json
{
    "rules": {
        "apply-early-return": "on"
    }
}
```

## ❌ Example of incorrect code

```js
if (x)
    return;
else
    console.log();
```

## ✅ Example of correct code

```js
if (x)
    return;

console.log();
```

## License

MIT
