# @putout/plugin-convert-map-to-for-of [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-map-to-for-of.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-map-to-for-of "npm"

> - The [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method creates a new array populated with the results of calling a provided function on every element in the calling array.
>
> - The [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement creates a loop which invokes a custom iteration hook with statements to be executed for the value of each element of an array.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `map` to `for...of` loop.

## Install

```
npm i @putout/plugin-convert-map-to-for-of -D
```

## Rule

```json
{
    "rules": {
        "convert-map-to-for-of": "on"
    }
}
```

## ❌ Example of incorrect code

```js
names.map((name) => {
    alert(`hello ${name}`);
});
```

## ✅ Example of correct code

```js
for (const name of names) {
    alert(`hello ${name}`);
}
```

## License

MIT
