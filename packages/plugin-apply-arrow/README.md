# @putout/plugin-apply-arrow [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-arrow.svg?style=flarrow&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-arrow "npm"

> An arrow function expression is a compact alternative to a traditional function expression, with some semantic differences and deliberate limitations in usage:
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert Function Declaration to Arrow Function. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/828228d2515805afc682eab0fe0a4105/a2c6507dd197d04cbbd387e4fb414ef6548234cf).

## Install

```
npm i @putout/plugin-apply-arrow
```

## Rule

```json
{
    "rules": {
        "apply-arrow": ["on", {
            "maxSize": 30
        }]
    }
}
```

## ❌ Example of incorrect code

```js
export function replace() {
    return {
        'if __a > __b': 'if (__a > __b)',
    };
}
```

## ✅ Example of correct code

```js
export const replace = () => ({
    'if __a > __b': 'if (__a > __b)',
});
```

## License

MIT
