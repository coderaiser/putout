# @putout/plugin-remove-boolean-from-logical-expressions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-boolean-from-logical-expressions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-boolean-from-logical-expressions "npm"

> A **boolean** is a logical data type that can have only the values `true` or `false`.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Boolean)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove **boolean** from **logical expressions**.

## Install

```
npm i @putout/plugin-remove-boolean-from-logical-expressions -D
```

## Rule

```json
{
    "rules": {
        "remove-boolean-from-logical-expressions": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const t = true && false;
```

## ✅ Example of correct code

```js
const t = false;
```

## License

MIT
