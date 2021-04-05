# @putout/plugin-apply-array-at [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-array-at.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-array-at"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-array-at
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-array-at

`putout` plugin adds ability to apply [array.at](https://github.com/tc39/proposal-relative-indexing-method).

## Install

```
npm i @putout/plugin-apply-array-at
```

## Rule

Rule `apply-array-at` is `disable` by default, to `enable` add to `.putout.json`:

## Rule

```json
{
    "rules": {
        "apply-array-at": "on"
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
