# @putout/plugin-remove-useless-types-from-constants [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-types-from-constants.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-types-from-constants "npm"

`putout` plugin adds ability to convert `generic` to `shorthand` (https://stackoverflow.com/a/36843084/4536327).

## Install

```
npm i @putout/plugin-remove-useless-types-from-constants -D
```

## Rule

Rule `remove-useless-types-from-constants` is enabled by default for `ts` and `tsx` files, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-useless-types-from-constants": "off"
    }
}
```

## ❌ Incorrect code example

```ts
const x: any = 5;
```

## ✅ Correct code Example

```ts
const x = 5;
```

## License

MIT
