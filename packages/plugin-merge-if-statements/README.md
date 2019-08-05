# putout-plugin-merge-if-statements [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-merge-if-statements.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-merge-if-statements"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-merge-if-statements
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-merge-if-statements

`putout` plugin adds ability to merge if statements.

## Install

```
npm i @putout/plugin-merge-if-statements
```

## Rule

```json
{
    "rules": {
        "merge-if-statements": false
    }
}
```

## ❌ Incorrect code example

```js
if (a > b) {
    if (b < c) {
        console.log('hello');
    }
}
```

## ✅ Correct code Example

```js
if (a > b && b < c) {
    console.log('hello');
}
```

## License

MIT

