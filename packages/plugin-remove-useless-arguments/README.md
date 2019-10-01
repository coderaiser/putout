# putout-plugin-remove-useless-arguments [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-useless-arguments.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-useless-arguments"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-arguments
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-arguments

`putout` plugin adds ability to find and add `return await`.

## Install

```
npm i @putout/plugin-remove-useless-arguments
```

## Rule

```json
{
    "rules": {
        "remove-useless-arguments": true
    }
}
```

## ❌ Incorrect code example

```js
onIfStatement({
    push,
    generate,
    abc,
    helloworld,
})

function onIfStatement({push}) {
}
```

## ✅ Correct code Example

```js
onIfStatement({
    push,
})

function onIfStatement({push}) {
}
```

## License

MIT

