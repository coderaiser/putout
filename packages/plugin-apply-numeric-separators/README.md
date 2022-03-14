# @putout/plugin-apply-numeric-separators [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-numeric-separators.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-numeric-separators"npm"

> To improve readability for numeric literals, underscores (`_`) can be used as separators.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin apply **numeric separators**.

## Install

```
npm i @putout/plugin-apply-numeric-separators
```

## Rule

```json
{
    "rules": {
        "apply-numeric-separators": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const t = 10000000;
```

## ✅ Example of correct code

```js
const t = 10_000_000;
```

## License

MIT
