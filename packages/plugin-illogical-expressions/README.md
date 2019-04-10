# illogical-expressions-plugin-illogical-expressions [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-illogical-expressions.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-illogical-expressions "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-illogical-expressions
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-illogical-expressions

`putout` plugin helps to determine and fix `illogical-expressions`.

## Install

```
npm i putout/plugin-illogical-expressions -D
```

## Rule

```json
{
    "rules": {
        "illogical-expressions/identifier-with-couple-values": true
    }
}
```

## identifier-with-couple-values

### ❌ Incorrect code example

```js
if (a === 4 && a === 3)
    console.log('');
```

### ✅ Correct code Example

```js
if (a === 4 || a === 3)
    console.log('');
```

## License

MIT

