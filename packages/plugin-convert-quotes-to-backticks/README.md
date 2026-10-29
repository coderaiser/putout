# @putout/plugin-convert-quotes-to-backticks [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-quotes-to-backticks.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-quotes-to-backticks "npm"

> Template literals are literals delimited with **backticks** (`).
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert **quotes** to **backticks**. Related to [@putout/plugin-remove-useless-escape](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-useless-escape#readme).

## Install

```
npm i @putout/plugin-convert-quotes-to-backticks -D
```

## Rule

```json
{
    "rules": {
        "convert-quotes-to-backticks": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const a = 'hello \'world\'';
```

## ✅ Example of correct code

```js
const a = `hello 'world'`;
```

## License

MIT
