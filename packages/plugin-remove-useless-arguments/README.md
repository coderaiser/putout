# putout-plugin-remove-useless-arguments [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-useless-arguments.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-useless-arguments"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-arguments
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-arguments

`putout` plugin adds ability to find and remove useless `arguments`.

## Install

```
npm i @putout/plugin-remove-useless-arguments
```

## Rule

```json
{
    "rules": {
        "remove-useless-arguments/arguments": true,
        "remove-useless-arguments/destructuring": true
    }
}
```

## ❌ Incorrect code example

```js
// destructuring
onIfStatement({
    push,
    generate,
    abc,
    helloworld,
})

function onIfStatement({push}) {
}

// arguments
sum(a, b, c);

const sum = (a, b) => {};
```

## ✅ Correct code Example

```js
// destructuring
onIfStatement({
    push,
})

function onIfStatement({push}) {
}

// arguments
sum(a, b, c);

const sum = (a, b) => {};

```

## License

MIT

