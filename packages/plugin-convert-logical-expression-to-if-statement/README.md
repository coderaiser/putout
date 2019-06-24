# putout-plugin-convert-logical-expression-to-if-statement [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-convert-logical-expression-to-if-statement.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-convert-logical-expression-to-if-statement"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-convert-logical-expression-to-if-statement
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-convert-logical-expression-to-if-statement

`putout` plugin adds ability to find and convert `binary expression` to `boolean`.

## Install

```
npm i @putout/plugin-convert-logical-expression-to-if-statement -D
```

## Rule

```json
{
    "rules": {
        "convert-logical-expression-to-if-statement": true
    }
}
```

## ❌ Incorrect code example

```js
isClose && close();
```

## ✅ Correct code Example

```js
if (isClose)
    close();
```

## License

MIT

