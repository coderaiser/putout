# putout-plugin-remove-useless-async [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-useless-async.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-useless-async"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-async
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-async

`putout` plugin adds ability to apply shorthand properties.

## Install

```
npm i @putout/plugin-remove-useless-async
```

## Rule

```json
{
    "rules": {
        "remove-useless-async": true
    }
}
```

## ❌ Incorrect code example

```js
async function show() {
    console.log('hello');
}
```

## ✅ Correct code Example

```js
function show() {
    console.log('hello');
}
```

## License

MIT

