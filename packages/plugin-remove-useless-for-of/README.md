# @putout/plugin-remove-useless-for-of [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-useless-for-of.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-useless-for-of "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-for-of
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-for-of

`putout` plugin adds ability to remove useless `for-of` statements.

## Install

```
npm i @putout/plugin-remove-useless-for-of
```

## Rule

```json
{
    "rules": {
        "remove-useless-for-of": "on"
    }
}
```

## ❌ Incorrect code example

```js
for (const a of ['hello']) {
    console.log(a);
}
```

## ✅ Correct code Example

```js
console.log('hello');
```

## License

MIT

