# @putout/plugin-remove-useless-typeof [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-typeof.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-typeof"npm"

> The `typeof` operator returns a string indicating the type of the unevaluated operand.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply shorthand properties.

## Install

```
npm i @putout/plugin-remove-useless-typeof
```

## Rule

```json
{
    "rules": {
        "remove-useless-typeof": "on"
    }
}
```

## ❌ Example of incorrect code

```js
typeof typeof 'hello';
```

## ✅ Example of correct code

```js
typeof 'hello';
```

## License

MIT
