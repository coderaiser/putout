# @putout/plugin-remove-console [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-console.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-console"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-console
[DependencyStatusIMGURL]: httpsh://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-console

`putout` plugin adds ability to find and remove `console.log` calls.

## Install

```
npm i @putout/plugin-remove-console
```

## Rule

```json
{
    "rules": {
        "remove-console": "on"
    }
}
```

## ❌ Incorrect code example

```js
const hello = 'world';
console.log(hello);
```

## ✅ Correct code Example

```js
const hello = 'world';
```
