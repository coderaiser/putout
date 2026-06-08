# @putout/plugin-destructuring [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-destructuring.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-destructuring "npm"

> The **destructuring** assignment syntax is a **JavaScript** expression that makes it possible to unpack values from `arrays`, or `properties` from `objects`, into distinct `variables`.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to use **destructuring** on variable declarations.

## Install

```
npm i @putout/plugin-destructuring
```

## Rules

- ✅ [apply-array](#apply-array);
- ✅ [apply-object](#apply-object);
- ✅ [convert-object-to-array](#convert-object-to-array);
- ✅ [extract-properties](#extract-properties);
- ✅ [remove-useless-object](#remove-useless-object);
- ✅ [remove-useless-arguments](#remove-useless-arguments);
- ✅ [remove-useless-variables](#remove-useless-variables);
- ✅ [remove-useless-rename](#remove-useless-rename);
- ✅ [split-nested](#split-nested);
- ✅ [split-call](#split-call);
- ✅ [merge-properties](#merge-properties);

## Config

```json
{
    "rules": {
        "destructuring/apply-array": "on",
        "destructuring/apply-object": "on",
        "destructuring/convert-object-to-array": "on",
        "destructuring/extract-properties": "on",
        "destructuring/remove-useless-object": "on",
        "destructuring/remove-useless-arguments": "on",
        "destructuring/remove-useless-variables": "on",
        "destructuring/remove-useless-rename": "on",
        "destructuring/split-nested": "on",
        "destructuring/split-call": "on",
        "destructuring/merge-properties": "on"
    }
}
```

## apply-array

### ❌ Example of incorrect code

```js
const first = array[0];
```

### ✅ Example of correct code

```js
const [first] = array;
```

## apply-object

### ❌ Example of incorrect code

```js
const name = user.name;

hello = world.hello;
```

### ✅ Example of correct code

```js
const {name} = user;

({hello} = world);
```

## remove-useless-object

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/c9ed04b421d75ae39e58038fa6e14630/4c097e3173990ec7e5ebabbe2cedf8e952092ebf).

### ❌ Example of incorrect code

```js
const {maxElementsInOneLine} = {
    options,
};
```

### ✅ Example of correct code

```js
const {maxElementsInOneLine} = options;
```

## remove-useless-rename

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/bff12ac912bec590fece55d63af467fc/0928cb7c8403d77497e9619503caa29ca6c1538c).

### ❌ Example of incorrect code

```js
const {
    convert: convertFn = convertFile,
} = overrides;

convertFn('hello');
```

### ✅ Example of correct code

```js
const {
    convert = convertFile,
} = overrides;

convert('hello');
```

## convert-object-to-array

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/a1d26daf8bb83ee3ea1c0b62a6ad3afd/cef9b4d27c9dbb0d413a935b0359a6fe9b50364f).

### ❌ Example of incorrect code

```js
const {0: a, 1: b} = c;
```

### ✅ Example of correct code

```js
const [a, b] = c;
```

## split-nested

> - Don't use nested destructuring on data that comes from any external data sources (such as `REST API`s, `GraphQL` endpoints or files).
> - Don't use nested destructuring on function arguments that have long or complicated signatures.
>
> (c) [Destructuring in JavaScript: the not so good parts](https://goodguydaniel.com/blog/destructuring-not-so-good-parts)

### ❌ Example of incorrect code

```js
const {
    a: {
        b,
    },
    a: {
        b: x,
    },
} = c;

function f({a}) {
    const {b} = a;
    console.log(b);
}
```

### ✅ Example of correct code

```js
const {a} = c;
const {b, b: x} = a;

function f({a}) {
    const {b} = a;
    console.log(b);
}
```

## split-call

### ❌ Example of incorrect code

```js
console.log('hello')({uid} = path.scope);
console.log('hello')[uid] = path.scope;
```

### ✅ Example of correct code

```js
console.log('hello');
({uid} = path.scope);

console.log('hello');
[uid] = path.scope;
```

## merge-properties

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/11c8cfa59f87e46238309b857448b9c5/688f10ad8fd7c0e4d9e9e0c74c399f1edb3ba29e).

### ❌ Example of incorrect code

```js
const {one} = require('numbers');
const {two} = require('numbers');

({from} = data);
({to} = data);
({names} = data);
```

### ✅ Example of correct code

```js
const {one, two} = require('numbers');

({
    from,
    to,
    names,
} = data);
```

## remove-useless-arguments

### ❌ Example of incorrect code

```js
onIfStatement({
    push,
    generate,
    abc,
    helloworld,
});

function onIfStatement({push}) {}
```

### ✅ Example of correct code

```js
onIfStatement({
    push,
});

function onIfStatement({push}) {}
```

## remove-useless-variables

### ❌ Example of incorrect code

```js
function hi(c) {
    const {a, b} = c;
}
```

### ✅ Example of correct code

```js
function hi({a, b}) {}
```

## extract-properties

### Equal Deep

#### ❌ Example of incorrect code

```js
const {replaceWith} = a.operate;
const {isIdentifier} = a.types;
```

#### ✅ Example of correct code

```js
const {operator, types} = a;

const {replaceWith} = operator;
const {isIdentifier} = types;
```

### Not Equal Deep

#### ❌ Example of incorrect code

```js
const {replaceWith} = a;
const {isIdentifier} = a.types;
```

#### ✅ Example of correct code

```js
const {replaceWith, types} = a;
const {isIdentifier} = types;
```

## License

MIT
