# @putout/plugin-apply-filter-boolean [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-filter-boolean.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-filter-boolean "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-filter-boolean
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-filter-boolean

`putout` plugin adds ability to apply `filter(Boolean)`.

## Install

```
npm i @putout/plugin-apply-filter-boolean
```

## Rule

```json
{
    "rules": {
        "apply-filter-boolean": "on"
    }
}
```

## ❌ Incorrect code example

```ts
array.filter((a) => a);
```

## ✅ Correct code Example

```ts
array.filter(Boolean);
```

## License

MIT
