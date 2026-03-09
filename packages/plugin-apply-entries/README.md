# @putout/plugin-apply-entries [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-entries.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-entries "npm"

> The `Object.entries()` static method returns an array of a given object's own enumerable string-keyed property key-value pairs..
>
> (c) [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

> The entries() method of Array instances returns a new array iterator object that contains the key/value pairs for each index in the array.
>
> (c) [Array.prototype.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply `entries()`.

While `entries()` does the same for `Object` and `Array`, if you for some reason confuse this to methods, and use `Object.entries()` on array, you will have `string`-indexes.

- ☝️ *Not bundled since it most likely will be bad for coverage*
- ☝️ *Requires additional configuration to work in ESLint and 🐊**Putout** as it is ESM module*

```js
for (const [index, value] of Object.entries(['a', 'b', 'c'])) {
    console.log(index === 1); // never true
}
```

So (thanks to [`@putout/plugin-declare`](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare#readme)), you can use:

```js
const {isArray} = Array;
const entries = (a) => isArray(a) ? a.entries() : Object.entries(a);

// entries called only once during loop initialization
for (const [index, value] of entries(['a', 'b', 'c'])) {
    console.log(index === 1); // never true
}
```

So instead of memorizing:

- ❌ `Array.entries()`;
- ❌ `Object.prototype.entries()`;
- ✅ `Array.prototype.entries()`;
- ✅ `Object.entries()`;

Just use:

- 🐊 `entries()`;

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/0eb1e099e049559ef9f70ab426d7b8c9/438e8507b4f46020dc4dd5b7428d7eb7b71877e0).

## Install

```
npm i @putout/plugin-apply-entries
```

## Rule

```json
{
    "rules": {
        "apply-entries": "on"
    }
}
```

## ❌ Example of incorrect code

```js
{}
```

## ✅ Example of correct code

```js
const {isArray} = Array;
const entries = (a) => isArray(a) ? a.entries() : Object.entries(a);

{}
```

## License

MIT
