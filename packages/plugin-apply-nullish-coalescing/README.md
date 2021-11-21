# @putout/plugin-apply-nullish-coalescing [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-nullish-coalescing.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-nullish-coalescing"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin apply `optional chaining`.

## Install

```
npm i @putout/plugin-apply-nullish-coalescing
```

## Rule

```json
{
    "rules": {
        "apply-nullish-coalescing": "on"
    }
}
```

## ❌ Incorrect code example

```js
result = result || 'hello';
result = typeof result  === 'undefined' ? 'hello' : result;
```

## ✅ Correct code Example

```js
const result = result ?? 'hello';
```

## License

MIT
