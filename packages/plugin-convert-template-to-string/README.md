# @putout/plugin-convert-template-to-string [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-template-to-string.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-template-to-string"npm"

> - [**Template literals**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) are literals delimited with backticks (`), allowing embedded expressions called substitutions.
> - The [**`String`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) object is used to represent and manipulate a sequence of characters.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and convert **Template Literals** to calling of `String` constructor.

## Install

```
npm i @putout/plugin-convert-template-to-string
```

## Rule

```json
{
    "rules": {
        "convert-template-to-string": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const s = `${a + b}`;
```

## ✅ Example of correct code

```js
const s = String(a + b);
```

## License

MIT
