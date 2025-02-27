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

## Rules

- ✅ [object](#object);
- ✅ [array](#array);
- ✅ [falsy](#falsy);

## Config

Short:

```json
{
    "rules": {
        "apply-destructuring": "on"
    }
}
```

Full:

```json
{
    "rules": {
        "apply-destructuring/object": "on",
        "apply-destructuring/array": "on",
        "apply-destructuring/falsy": "on"
    }
}
```

## array

## ❌ Example of incorrect code

```js
const first = array[0];
```

## ✅ Example of correct code

```js
const [first] = array;
```

## object

## ❌ Example of incorrect code

```js
const name = user.name;

hello = world.hello;
```

## ✅ Example of correct code

```js
const {name} = user;

({hello} = world);
```

## falsy

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/c9ed04b421d75ae39e58038fa6e14630/4c097e3173990ec7e5ebabbe2cedf8e952092ebf).

## ❌ Example of incorrect code

```js
const {maxElementsInOneLine} = {
    options,
};
```

## ✅ Example of correct code

```js
const {maxElementsInOneLine} = options;
```

## License

MIT
