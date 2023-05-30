# @putout/plugin-convert-arguments-to-rest [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-arguments-to-rest.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-arguments-to-rest "npm"

> The rest parameter syntax allows a function to accept an indefinite number of arguments as an `array`, providing a way to represent variadic functions in JavaScript.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `arguments` to `rest`.

## Install

```
npm i @putout/plugin-convert-arguments-to-rest -D
```

## Rule

```json
{
    "rules": {
        "convert-arguments-to-rest": "on"
    }
}
```

## ❌ Example of incorrect code

```js
function hello() {
    console.log(arguments);
}
```

## ✅ Example of correct code

```js
function hello(...args) {
    console.log(args);
}
```

## License

MIT
