# @putout/plugin-remove-useless-array [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-array.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-array "npm"

> Property accessors provide access to an object's properties by using the dot notation or the bracket notation.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless array inside property accessors.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/5f12b264319f962d28c85948f6162ef9/03422d094b86256a4d20ac70cbcde929884844e3).

## Install

```
npm i @putout/plugin-remove-useless-array
```

## Rule

```json
{
    "rules": {
        "remove-useless-array": "on"
    }
}
```

## ❌ Example of incorrect code

```js
A[[B]];
```

## ✅ Example of correct code

```js
A[B];
```

## License

MIT
