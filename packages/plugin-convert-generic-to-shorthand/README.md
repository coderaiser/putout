# @putout/plugin-convert-generic-to-shorthand [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-generic-to-shorthand.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-generic-to-shorthand "npm"

`putout` plugin adds ability to convert `generic` to `shorthand` (https://stackoverflow.com/a/36843084/4536327).

## Install

```
npm i @putout/plugin-convert-generic-to-shorthand -D
```

## Rule

Rule `convert-generic-to-shorthand` is enabled by default for `ts` and `tsx` files, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-generic-to-shorthand": "off"
    }
}
```

## ❌ Incorrect code example

```ts
interface A {
    x: Array<X>;
    y: Array<Y>;
}
```

## ✅ Correct code Example

```ts
interface A {
    x: X[];
    y: Y[];
}
```

## License

MIT
