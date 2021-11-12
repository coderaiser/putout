# @putout/plugin-apply-utility-types [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-utility-types.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-utility-types"npm"

`putout` plugin adds ability to apply `utility types`.

## Install

```
npm i @putout/plugin-apply-utility-types
```

## Rule

```json
{
    "rules": {
        "apply-utility-types": "on"
    }
}
```

## ❌ Incorrect code example

```ts
type SuperType1 = {
    [Key in keyof Type]?: Type[Key];
}
```

## ✅ Correct code Example

```ts
type SuperType1 = Partial<Type>;
```

## License

MIT
