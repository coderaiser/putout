# putout-convert-throw [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/convert-throw.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/convert-throw "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/convert-throw
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/convert-throw

`putout` plugin adds ability convert throw statement into throw expression.
## Install

```
npm i @putout/convert-throw -D
```

## Rule

```json
{
    "rules": {
        "throw": true
    }
}
```

## ❌ Incorrect code example

```js
const fn = () => {throw Error('hello')};
```

## ✅ Correct code Example

```js
const fn = () => throw Error('hello');
```

## License

MIT

