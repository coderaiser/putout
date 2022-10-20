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

## License

MIT
