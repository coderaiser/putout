# @putout/plugin-apply-array-at [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-array-at.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-array-at "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to apply [array.at](https://github.com/tc39/proposal-relative-indexing-method).

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

## ❌ Example of incorrect code

```ts
const latest = (a) => a[a.length - 1];
```

## ✅ Example of correct code

```ts
const latest = (a) => a.at(-1);
```

## License

MIT
