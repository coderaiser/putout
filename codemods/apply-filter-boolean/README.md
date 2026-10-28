# @putout/plugin-apply-filter-boolean [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-filter-boolean.svg?style=flat\&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-filter-boolean "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply `filter(Boolean)`. Better use [@putout/plugin-remove-useless-functions](https://github.com/coderaiser/putout/tree/v21.6.0/packages/plugin-remove-useless-functions).

## Install

```
npm i @putout/plugin-apply-filter-boolean
```

## Rule

```json
{
    "rules": {
        "apply-filter-boolean": "on"
    }
}
```

## ❌ Example of incorrect code

```js
array.filter((a) => a);
```

## ✅ Example of correct code

```js
array.filter(Boolean);
```

## License

MIT
