# @putout/plugin-apply-destructuring [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-destructuring.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-destructuring"npm"

> The **destructuring** assignment syntax is a **JavaScript** expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to use **destructuring** on variable declarations.

## Install

```
npm i @putout/plugin-apply-destructuring
```

## Rule

```json
{
    "rules": {
        "apply-destructuring/object": "on",
        "apply-destructuring/array": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const first = array[0];
const name = user.name;
```

## ✅ Example of correct code

```js
const [first] = array;
const {name} = user;
```

## License

MIT
