# @putout/plugin-remove-duplicate-keys [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-keys.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-duplicate-keys"npm"

> An object initializer is a comma-delimited list of zero or more pairs of property names and associated values of an object, enclosed in curly braces (`{}`).
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove duplecate keys.

## Install

```
npm i @putout/plugin-remove-duplicate-keys
```

## Rule

```json
{
    "rules": {
        "remove-duplicate-keys": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const a = {
    x: 'hello',
    ...z,
    x: 'world',
};
```

## ✅ Example of correct code

```js
const a = {
    ...z,
    x: 'world',
};
```

> SyntaxError: Duplicate parameter name not allowed in this context
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Duplicate_parameter)

Argument name clash:

```diff
-const a = ({b, b, ...c}) => {};
+const a = ({b, ...c}) => {};
```

## License

MIT
