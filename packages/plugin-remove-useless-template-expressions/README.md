# putout-plugin-remove-useless-template-expressions [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-useless-template-expressions.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-useless-template-expressions"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-template-expressions
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-template-expressions

`putout` plugin adds ability to apply shorthand properties.

## Install

```
npm i @putout/plugin-remove-useless-template-expressions
```

## Rule

```json
{
    "rules": {
        "remove-useless-template-expressions": true
    }
}
```

## ❌ Incorrect code example

```js
let y =`${"hello"} + ${"world"}`;
```

## ✅ Correct code Example

```js
let y =`hello + world`;
```

## License

MIT

