# @putout/plugin-remove-useless-template-expressions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-template-expressions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-template-expressions"npm"

> Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `template expressions`.

## Install

```
npm i @putout/plugin-remove-useless-template-expressions -D
```

## Rule

```json
{
    "rules": {
        "remove-useless-template-expressions": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const y = `${'hello'} + ${'world'}`;
```

## ✅ Example of correct code

```js
const y = `hello + world`;
```

## License

MIT
