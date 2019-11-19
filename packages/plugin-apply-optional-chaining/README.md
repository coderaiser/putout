# putout-plugin-apply-optional-chaining [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-apply-optional-chaining.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-apply-optional-chaining"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-optional-chaining
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-optional-chaining

`putout` plugin apply `optional chaining`.

## Install

```
npm i @putout/plugin-apply-optional-chaining
```

## Rule

```json
{
    "rules": {
        "apply-optional-chaining": true
    }
}
```

## ❌ Incorrect code example

```js
const result = hello && hello.world;
```

## ✅ Correct code Example

```js
const result = hello?.world;
```

## License

MIT

