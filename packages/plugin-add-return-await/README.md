# putout-plugin-add-return-await [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-add-return-await.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-add-return-await"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-add-return-await
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-add-return-await

`putout` plugin adds ability to find and add `return await`.

## Install

```
npm i @putout/plugin-add-return-await
```

## Rule

```json
{
    "rules": {
        "add-return-await": true
    }
}
```

## ❌ Incorrect code example

```js
async function hello() {}
async function world() {
    return hello();
}
```

## ✅ Correct code Example

```js
async function hello() {}
async function world() {
    return await hello();
}
```

## License

MIT

