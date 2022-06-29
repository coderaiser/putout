# @putout/plugin-remove-useless-escape [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-escape.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-escape"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove useless escape.

## Install

```
npm i @putout/plugin-remove-useless-escape
```

## Rule

```json
{
    "rules": {
        "remove-useless-escape": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const t = 'hello \"world\"';
const s1 = `hello \"world\"`;
const s = `hello \'world\'`;
const reg = /\w\:/g;
```

## ✅ Example of correct code

```js
const t = 'hello "world"';
const s1 = `hello "world"`;
const s = `hello 'world'`;
const reg = /\w:/g;
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout**| [`remove-useless-escape`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-useless-escape#readme)| ✅
⏣ **ESLint** | [`no-useless-escape`](https://eslint.org/docs/rules/no-useless-escape) | ❌

## License

MIT
