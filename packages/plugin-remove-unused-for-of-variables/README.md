# @putout/plugin-remove-unused-for-of-variables [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-unused-for-of-variables.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-unused-for-of-variables"npm"

`putout` plugin adds ability to find and remove `unused` `for-of` `variables`.

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

## ❌ Incorrect code example

```js
for (const {a, b} of c) {
    console.log(a);
}
```

## ✅ Correct code Example

```js
for (const {a} of c) {
    console.log(a);
}
```

## License

MIT
