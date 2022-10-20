# @putout/plugin-math [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-math.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-math"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with `Math`.

## Install

```
npm i @putout/plugin-math -D
```

## Rules

```json
{
    "rules": {
        "math/apply-exponentiation": "on",
        "math/apply-multiplication": "on",
        "math/convert-sqrt-to-hypot": "on"
    }
}
```

## convert-sqrt-to-hypot

> The `Math.hypot()` function returns the square root of the sum of squares of its arguments.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot)

Convert `Math.sqrt()` to `Math.hypot()`. Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a35660f8883687ddfe53f8fbc36706ad/d83e26a547f71128f94af1d3fd542557ce820f1a).

### ❌ Example of incorrect code

```js
Math.sqrt(a ** 2, b ** 2);
```

### ✅ Example of correct code

```js
Math.hypot(a, b);
```

## apply-exponentiation

> - The [`Math.pow()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) static method, given two arguments, base and exponent, returns baseexponent.
> - The [**exponentiation operator**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation) (`**`) returns the result of raising the first operand to the power of the second operand. It is equivalent to `Math.pow`, except it also accepts BigInts as operands.
>
> (c) MDN

### ❌ Example of incorrect code

```js
Math.pow(2, 4);
```

### ✅ Example of correct code

```js
2 ** 4;
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`convert-math-pow`](https://github.com/coderaiser/putout/tree/master/packages/plugin-convert-math-pow#readme) | ✅
⏣ **ESLint** | [`prefer-exponentiation-operator`](https://eslint.org/docs/rules/prefer-exponentiation-operator) | ✅

## apply-multiplication

> Multiplying two numbers stored internally as integers (which is only possible with **AsmJS** with imul is the only potential circumstance where `Math.imul()` may prove performant in current browsers.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul)

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/cef45d5cc2bfd0156ed8d483cb6104d9/89ab39b05d3093d399e718f5615efe92f484c538).

### ❌ Example of incorrect code

```js
const a = Math.imul(b, c);

```

### ✅ Example of correct code

```js
const a = b * c;
```

## License

MIT
