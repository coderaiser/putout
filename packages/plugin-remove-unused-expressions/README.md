# @putout/plugin-remove-unused-expressions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unused-expressions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unused-expressions"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove `unused expressions`, excluding directives: [`use strict`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) and [`use client`](https://react.dev/reference/rsc/use-client).

## Install

```
npm i @putout/plugin-remove-unused-expressions -D
```

## Rule

```json
{
    "rules": {
        "remove-unused-expressions": "on"
    }
}
```

## ❌ Example of incorrect code

```js
function show(error) {
    showError;
}
```

## ✅ Example of correct code

```js
function show(error) {}
```

## License

MIT
