# @putout/plugin-convert-object-entries-to-object-keys [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-object-entries-to-object-keys.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-object-entreis-to-object-keys "npm"

> The `Object.keys()` static method returns an array of a given object's own enumerable string-keyed property key-value pairs.
>
> (c) [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

> The `Object.entries()` static method returns an array of a given object's own enumerable string-keyed property key-value pairs.
>
> (c) [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `Object.entries()` to `Object.keys()`

## Install

```
npm i @putout/plugin-convert-object-entries-to-object-keys -D
```

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/82cf60991515c274d0ba08f2ca36e9e6/a56a4bddfb45007434f2d24e9573a3d7646ea11d).

## Rule

```json
{
    "rules": {
        "convert-object-entries-to-object-keys": "on"
    }
}
```

## ❌ Example of incorrect code

```js
for (const [name] of Object.entries(tokens)) {
    console.log(name);
}

for (const [name] of entries(tokens)) {
    console.log(name);
}
```

## ✅ Example of correct code

```js
for (const name of Object.keys(tokens)) {
    console.log(name);
}

for (const name of keys(tokens)) {
    console.log(name);
}
```

## License

MIT
