# @putout/plugin-convert-any-to-primitive [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-any-to-primitive.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-any-to-primitive "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `any` to primitive.
Moved to [`@putout/plugin-typescript`](https://github.com/coderaiser/putout/tree/v24.0.2/packages/plugin-typescript).

## Install

```
npm i @putout/plugin-convert-any-to-primitive -D
```

## Rule

Rule `convert-any-to-primitive` is enabled by default for `ts` and `tsx` files, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-any-to-primitive": "off"
    }
}
```

## ❌ Example of incorrect code

```ts
const x: any = 5;
```

## ✅ Example of correct code

```ts
const x: number = 5;
```

## License

MIT
