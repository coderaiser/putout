# @putout/plugin-remove-duplicate-case [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-case.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-duplicate-case "npm"

> The `switch` statement evaluates an expression, matching the expression's value to a `case` clause, and executes statements associated with that `case`, as well as statements in `cases` that follow the matching `case`.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove duplecate case.

## Install

```
npm i @putout/plugin-remove-duplicate-case
```

## Rule

```json
{
    "rules": {
        "remove-duplicate-case": "on"
    }
}
```

## ❌ Example of incorrect code

```js
switch(x) {
case 5:
    console.log('hello');
    break;

case 5:
    console.log('zz');
    break;
}
```

## ✅ Example of correct code

```js
switch(x) {
case 5:
    console.log('hello');
    break;
}
```

## License

MIT
