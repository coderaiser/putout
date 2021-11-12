# @putout/plugin-convert-any-to-primitive [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-any-to-primitive.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-any-to-primitive "npm"

`putout` plugin adds ability to convert `generic` to `shorthand` (https://stackoverflow.com/a/36843084/4536327).

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

## ❌ Incorrect code example

```ts
const x: any = 5;
```

## ✅ Correct code Example

```ts
const x: number = 5;
```

## License

MIT
