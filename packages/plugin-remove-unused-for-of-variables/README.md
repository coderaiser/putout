# @putout/plugin-remove-unused-for-of-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unused-for-of-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unused-for-of-variables"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove `unused` `for-of` `variables`.

## Install

```
npm i @putout/plugin-remove-unused-for-of-variables -D
```

## Rule

```json
{
    "rules": {
        "remove-unused-for-of-variables": "on"
    }
}
```

## ❌ Example of incorrect code

```js
for (const {a, b} of c) {
    console.log(a);
}
```

## ✅ Example of correct code

```js
for (const {a} of c) {
    console.log(a);
}
```

## License

MIT
