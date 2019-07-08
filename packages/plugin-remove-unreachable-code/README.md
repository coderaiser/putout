# putout-plugin-remove-unreachable-code [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-unreachable-code.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-unreachable-code"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unreachable-code
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unreachable-code

`putout` plugin adds ability to find and remove unreachable code.

## Install

```
npm i @putout/plugin-remove-unreachable-code
```

## Rule

```json
{
    "rules": {
        "remove-unreachable-code": true
    }
}
```

## ❌ Incorrect code example

```js
function hi() {
    return 'world';
    console.log('hello');
}

function log() {
    throw Error('error');
    console.log('hello');
}
```

## ✅ Correct code Example

```js
function hi() {
    return 'world';
}

function log() {
    throw Error('error');
}
```

## License

MIT

