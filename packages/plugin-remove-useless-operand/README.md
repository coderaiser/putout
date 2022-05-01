# @putout/plugin-remove-useless-operand [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-operand.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-operand "npm"

> The [**increment operator**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment) (`++`) adds one to its operand and returns a value.
>
> The [**addition assignment operator**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment) (`+=`) adds the value of the right operand to a variable and assigns the result to the variable.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless **operand**.

## Install

```
npm i @putout/plugin-remove-useless-operand
```

## Rule

```json
{
    "rules": {
        "remove-useless-operand": "on"
    }
}
```

## ❌ Example of incorrect code

```js
a = a + b;
a = b + a;
b += 1;
```

## ✅ Example of correct code

```js
a += b;
++b;
```

## License

MIT
