# @putout/plugin-add-return-await [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-add-return-await.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-add-return-await"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and add `return await`. Part of [@putout/promises](https://github.com/coderaiser/putout/blob/master/packages/plugin-promises/README.md).

## Install

```
npm i @putout/plugin-add-return-await
```

## Rule

```json
{
    "rules": {
        "add-return-await": "on"
    }
}
```

## ❌ Example of incorrect code

```js
async function world() {
    return hello();
}
```

## ✅ Example of correct code

```js
async function world() {
    return await hello();
}
```

## License

MIT
