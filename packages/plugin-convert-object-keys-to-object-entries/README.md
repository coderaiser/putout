# @putout/plugin-convert-object-keys-to-object-entries [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-object-keys-to-object-entries.svg?style=flat&longCache=true
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
npm i @putout/plugin-convert-object-keys-to-object-entries -D
```

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/c0d9b423faead0875f65ea662a42288a/241ecc8b1418ccf174a84e2785def0fd02f28620).

## Rule

```json
{
    "rules": {
        "convert-object-keys-to-object-entries": "on"
    }
}
```

## ❌ Example of incorrect code

```js
for (const [key, value] of Object.keys(tokens)) {
    console.log(key, value);
}

for (const [key, value] of keys(tokens)) {
    console.log(key, value);
}
```

## ✅ Example of correct code

```js
for (const [key, value] of Object.entries(tokens)) {
    console.log(key, value);
}

for (const [key, value] of Object.entries(tokens)) {
    console.log(key, value);
}
```

## License

MIT
