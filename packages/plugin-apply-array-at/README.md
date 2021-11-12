# @putout/plugin-apply-array-at [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-array-at.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-array-at "npm"

`putout` plugin adds ability to apply [array.at](https://github.com/tc39/proposal-relative-indexing-method).

## Install

```
npm i @putout/plugin-apply-array-at
```

## Rule

```json
{
    "rules": {
        "apply-array-at": "off"
    }
}
```

## ❌ Incorrect code example

```ts
const latest = (a) => a[a.length - 1];
```

## ✅ Correct code Example

```ts
const latest = (a) => a.at(-1);
```

## License

MIT
