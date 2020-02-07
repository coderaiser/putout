# putout-plugin-apply-nullish-coalescing [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-apply-nullish-coalescing.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-apply-nullish-coalescing"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-nullish-coalescing
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-nullish-coalescing

`putout` plugin apply `optional chaining`.

## Install

```
npm i @putout/plugin-apply-nullish-coalescing
```

## Rule

```json
{
    "rules": {
        "apply-nullish-coalescing": true
    }
}
```

## ❌ Incorrect code example

```js
result = result || 'hello';
result = typeof result  === 'undefined' ? 'hello': result;
```

## ✅ Correct code Example

```js
const result = result ?? 'hello';
```

## License

MIT

