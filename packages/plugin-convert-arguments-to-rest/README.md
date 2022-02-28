# @putout/plugin-convert-arguments-to-rest [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-arguments-to-rest.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-arguments-to-rest "npm"

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
