# @putout/plugin-remove-useless-mapping-identifiers [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-mapping-identifiers.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-mapping-identifiers "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-mapping-identifiers
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-mapping-identifiers

`putout` plugin adds ability to remove useless [mapping modifiers](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers).

## Install

```
npm i @putout/plugin-remove-useless-mapping-identifiers
```

## Rule

```json
{
    "rules": {
        "remove-useless-mapping-identifiers": "on"
    }
}
```

## ❌ Incorrect code example

```ts
type SuperType = {
    [Key in keyof Type]+?: Type[Key];
}
```

## ✅ Correct code Example

```ts
type SuperType = {
    [Key in keyof Type]?: Type[Key];
}
```

## License

MIT
