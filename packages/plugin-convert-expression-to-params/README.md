# @putout/plugin-convert-expression-to-params [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-expression-to-params.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-expression-to-params "npm"

> `Uncaught SyntaxError: Malformed arrow function parameter list` occurs when your function declaration is missing valid parameters.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Missing_formal_parameter)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to fix `SyntaxError: missing formal parameter` .
Checkout in 🐊[**Putout Editor**](https://putout.vercel.app/#/gist/e1818c2385974e136ae77eb28b3d2221/66dcb650e02aaafffa7fe00914f80366c4bfd7d3).

## Install

```
npm i @putout/plugin-convert-expression-to-params -D
```

## Rule

```json
{
    "rules": {
        "convert-expression-to-params": "on"
    }
}
```

## ❌ Example of incorrect code

```js
(__a, __b) => __b + __a;
(__a, __b) => __b + __a;
(__a, hello, world) => __a;
```

## ✅ Example of correct code

```js
(__a, hello, world) => __a;
(__a, __b) => __b + __a;
(__a, __b) => __b + __a;
```

## License

MIT
