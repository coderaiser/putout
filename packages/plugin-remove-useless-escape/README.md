# putout-plugin-remove-useless-escape [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-useless-escape.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-useless-escape"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-escape
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-escape

`putout` plugin adds ability to find and remove useless escape.

## Install

```
npm i @putout/plugin-remove-useless-escape
```

## Rule

```json
{
    "rules": {
        "remove-useless-escape": true
    }
}
```

## ❌ Incorrect code example

```js
const t = 'hello \"world\"';
const s1 = `hello \"world\"`;
const s = `hello \'world\'`;
```

## ✅ Correct code Example

```js
const t = 'hello "world"';
const s1 = `hello "world"`;
const s = `hello 'world'`;
```

## License

MIT

