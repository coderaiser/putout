# @putout/plugin-convert-for-each-to-for-of [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-for-each-to-for-of.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-for-each-to-for-of "npm"

> The [`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method executes a provided function once for each array element.
>
> The [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement creates a loop which invokes a custom iteration hook with statements to be executed for the value of each element of an array.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `forEach()` to `for...of`.

## Install

```
npm i @putout/plugin-convert-for-each-to-for-of -D
```

## Rule

```json
{
    "rules": {
        "convert-for-each-to-for-of": "on"
    }
}
```

## ❌ Example of incorrect code

```js
Object.keys(json).forEach((name) => {
    manage(name, json[name]);
});

[].forEach.call(arguments, (item) => {
    console.log(item);
});
```

## ✅ Example of correct code

```js
for (const name of Object.keys(json)) {
    manage(name, json[name]);
}

for (const name of arguments) {
    console.log(item);
}
```

## License

MIT
