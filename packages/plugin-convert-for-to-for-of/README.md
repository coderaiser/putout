# @putout/plugin-convert-for-to-for-of [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-for-to-for-of.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-for-to-for-of "npm"

> The [`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) statement creates a loop that consists of three optional expressions, enclosed in parentheses and separated by semicolons, followed by a statement to be executed in the loop.
>
> The [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement creates a loop which invokes a custom iteration hook with statements to be executed for the value of each element of an array.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `for` to `for...of` loop.

## Install

```
npm i @putout/plugin-convert-for-to-for-of -D
```

## Rule

```json
{
    "rules": {
        "convert-for-to-for-of/n": "on",
        "convert-for-to-for-of/length": "on",
        "convert-for-to-for-of/entries": "on"
    }
}
```



## n

## ❌ Example of incorrect code

```js
const n = items.length;

for (let i = 0; i < n; i++) {
    const item = items[i];
    log(item);
}
```

## ✅ Example of correct code

```js
for (const item of items) {
    log(item);
}
```

## length

## ❌ Example of incorrect code

```js
for (let i = 0; i < array.length; i++) {
    const item = array[i];
    console.log(item);
}
```

## ✅ Example of correct code

```js
for (const item of items) {
    log(item);
}
```

## entries

## ❌ Example of incorrect code

```js
for (let i = 0; i < array.length; i++) {
    const item = array[i];
    console.log(i, item);
}
```

## ✅ Example of correct code

```js
for (const [i, item] of array.entries()) {
    console.log(i, item);
}
```

## License

MIT
