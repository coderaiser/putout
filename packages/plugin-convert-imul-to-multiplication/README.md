# @putout/plugin-convert-imul-to-multiplication [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-imul-to-multiplication.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-imul-to-multiplication "npm"

> Multiplying two numbers stored internally as integers (which is only possible with **AsmJS** with imul is the only potential circumstance where `Math.imul()` may prove performant in current browsers.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `Math.imul()` to `*` operator.
Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/cef45d5cc2bfd0156ed8d483cb6104d9/89ab39b05d3093d399e718f5615efe92f484c538).

## Install

```
npm i @putout/plugin-convert-imul-to-multiplication -D
```

## Rule

Rule `convert-imul-to-multiplication` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-imul-to-multiplication": "off"
    }
}
```

## ❌ Example of incorrect code

```js
const a = Math.imul(b, c);

```

## ✅ Example of correct code

```js
const a = b * c;
```

## License

MIT
