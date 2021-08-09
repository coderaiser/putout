# @putout/plugin-split-variable-declarations [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-split-variable-declarations.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-split-variable-declarations "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-split-variable-declarations
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-split-variable-declarations

`putout` plugin adds ability to find and split variable declarations.

## Install

```
npm i @putout/plugin-split-variable-declarations
```

## Rule

```json
{
    "rules": {
        "split-variable-declarations": "on"
    }
}
```

## ❌ Incorrect code example

```js
let a, b;
```

## ✅ Correct code Example

```js
let a;
let b;
```

## License

MIT
