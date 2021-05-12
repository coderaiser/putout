# @putout/plugin-apply-as-type-assertion [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-as-type-assertion.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-as-type-assertion"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-as-type-assertion
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-as-type-assertion

`putout` plugin adds ability to apply `as` type asssertion according to [best practices](https://basarat.gitbook.io/typescript/type-system/type-assertion#as-foo-vs-less-than-foo-greater-than)

## Install

```
npm i @putout/plugin-apply-as-type-assertion
```

## Rule

Rule `apply-as-type-assertion` is not bundled by default, to `enable` add to `.putout.json`:

## Rule

```json
{
    "rules": {
        "apply-as-type-assertion": "on"
    }
}
```

## ❌ Incorrect code example

```ts
const boundaryElement = <HTMLElement>e.target;
```

## ✅ Correct code Example

```ts
const boundaryElement1 = e.target as HTMLElement;
```

## License

MIT
