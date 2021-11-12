# @putout/plugin-remove-useless-mapped-types [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-mapped-types.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-mapped-types "npm"

`putout` plugin adds ability to remove useless [mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html).

## Install

```
npm i @putout/plugin-remove-useless-mapped-types
```

## Rule

```json
{
    "rules": {
        "remove-useless-mapped-types": "on"
    }
}
```

## ❌ Incorrect code example

```ts
type SuperType = {
    [Key in keyof Type]: Type[Key];
}
```

## ✅ Correct code Example

```ts
type SuperType = Type;
```

## License

MIT
