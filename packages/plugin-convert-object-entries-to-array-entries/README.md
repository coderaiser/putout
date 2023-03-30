# @putout/plugin-convert-object-entries-to-array-entries [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-object-entries-to-array-entries.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-object-entries-to-array-entries "npm"

> The `Object.entries()` static method returns an array of a given object's own enumerable string-keyed property key-value pairs.
>
> (c) [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

> The `entries()` method returns a new `Array Iterator` object that contains the key/value pairs for each index in the array.
>
> (c) [`Array.prototype.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `Object.entries()` to `Array.prototype.entries()` to avoid bugs
related to using `index` in unary (`!index`) or binary (`index > length`) expressions, the thing is `Object.entries()` returns list of `Array<String, any>` tuples,
and `Array.prototype.entries()` returns list of `Array<Number, any>` tuples it can lead to bugs when you expected that `index` is number.

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f902e1f52d551545cede97db4cfba345/dbae8bfd2c4b0b4ec9612e2002a87c2a5961204d).

## Install

```
npm i @putout/plugin-convert-object-entries-to-array-entries -D
```

## Rule

```json
{
    "rules": {
        "convert-object-entries-to-array-entries": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const {entries} = Object;

for (const [i, token] of entries(tokens)) {
    if (!i)
        continue;
    
    fn(token);
}
```

## ✅ Example of correct code

```js
for (const [i, token] of tokens.entries()) {
    if (!i)
        continue;
    
    fn(token);
}
```

## License

MIT
