# @putout/plugin-extract-sequence-expressions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-extract-sequence-expressions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-extract-sequence-expressions"npm"

> The comma operator (`,`) evaluates each of its operands (from left to right) and returns the value of the last operand. This lets you create a compound expression in which multiple expressions are evaluated, with the compound expression's final value being the value of the rightmost of its member expressions.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to extract **sequence expressions**.

## Install

```
npm i @putout/plugin-extract-sequence-expressions -D
```

## Rule

```json
{
    "rules": {
        "extract-sequence-expressions": "on"
    }
}
```

## ❌ Example of incorrect code

```js
module.exports.x = 1,
module.exports.y = 2;

fn((a, b));
```

## ✅ Example of correct code

```js
module.exports.x = 1;
module.exports.y = 2;

fn(a, b);
```

## License

MIT
