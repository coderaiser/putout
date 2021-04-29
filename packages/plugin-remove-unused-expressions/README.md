# @putout/plugin-remove-unused-expressions [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unused-expressions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unused-expressions"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-expressions
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-expressions

`putout` plugin adds ability to find and remove `unused expressions`.

## Install

```
npm i @putout/plugin-remove-unused-expressions -D
```

## Rule

```json
{
    "rules": {
        "remove-unused-expressions": "on"
    }
}
```

## ❌ Incorrect code example

```js
function show(error) {
    showError;
}
```

## ✅ Correct code Example

```js
function show(error) {
}
```

## License

MIT
