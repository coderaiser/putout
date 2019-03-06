# putout-plugin-remove-useless-variables [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-useless-variables.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-useless-variables"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-variables
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-variables

`putout` plugin adds ability to find and remove `useless-variables` statement.

## Install

```
npm i @putout/plugin-remove-useless-variables -D
```

## Rule

```json
{
    "rules": {
        "remove-useless-variables": true
    }
}
```

## ❌ Incorrect code example

```js
function hi(a) {
  const b = a;
};
```

## ✅ Correct code Example

```js
function hi(b) {
};
```

## License

MIT

