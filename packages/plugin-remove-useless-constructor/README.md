# @putout/plugin-remove-useless-constructor [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-constructor.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-constructor "npm"

> The `constructor` method is a special method of a class for creating and initializing an object instance of that class.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `constructor`.
Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/4f23b20fe29ebaf9c691662846f75c0f/04a5f3c7ea0aba9dd9ed9fe76d957c29c46ef626).

## Install

```
npm i @putout/plugin-remove-useless-constructor
```

## Rule

```json
{
    "rules": {
        "remove-useless-constructor": "on"
    }
}
```

## ❌ Example of incorrect code

```js
class A extends B() {
    constructor(...args) {
        super(...args);
    }
}
```

## ✅ Example of correct code

```js
class A extends B() {}
```

## License

MIT
