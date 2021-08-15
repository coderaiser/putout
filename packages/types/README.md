# @putout/plugin-remove-debugger [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-debugger.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-debugger "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-debugger
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-debugger

`putout` plugin adds ability to find and remove `debugger` statement.

## Install

```
npm i @putout/plugin-remove-debugger
```

## Rule

```json
{
    "rules": {
        "remove-debugger": "on"
    }
}
```

## ❌ Incorrect code example

```js
debugger;
console.log('hello');
```

## ✅ Correct code Example

```js
console.log('hello');
```

## License

MIT
