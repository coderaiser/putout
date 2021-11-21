# @putout/plugin-remove-useless-async [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-async.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-async"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to remove useless `async`. Part of [@putout/plugin-promises](https://github.com/coderaiser/putout/tree/master/packages/plugin-promises).

## Install

```
npm i @putout/plugin-remove-useless-async
```

## Rule

```json
{
    "rules": {
        "remove-useless-async": "on"
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
