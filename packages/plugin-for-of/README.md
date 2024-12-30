# @putout/plugin-for-of [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-for-of.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-for-of "npm"

> The [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) statement creates a loop which invokes a custom iteration hook with statements to be executed for the value of each element of an array.
>
> (c) MDN

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds support of transformation `for...of` statements.

## Install

```
npm i @putout/plugin-for-of
```

## Rules

- ✅ [add-missing-declaration](#add-missing-declaration);
- ✅ [for-each](#for-each);
- ✅ [for-entries](#for-entries);
- ✅ [for-entries-n](#for-entries-n);
- ✅ [for-in-negative](#for-in-negative);
- ✅ [for-in-positive](#for-in-positive);
- ✅ [for-length](#for-length);
- ✅ [for-n](#for-n);
- ✅ [map](#map);
- ✅ [reduce](#reduce);
- ✅ [remove-unused-variables](#remove-unused-variables);
- ✅ [remove-useless](#remove-useless);
- ✅ [remove-useless-array-from](#remove-useless-array-from);
- ✅ [remove-useless-variables](#remove-useless-variables);
- ✅ [to-for-n](#to-for-n);

## Configuration

```json
{
    "rules": {
        "for-of/add-missing-declaration": "on",
        "for-of/map": "on",
        "for-of/for-in": "on",
        "for-of/for-each": "on",
        "for-of/reduce": "on",
        "for-of/remove-unused-variables": "on",
        "for-of/remove-useless": "on",
        "for-of/remove-useless-array-from": "on",
        "for-of/remove-useless-variables": ["on", {
            "maxProperties": 4
        }],
        "for-of/for": "on",
        "for-of/to-for-n": "on"
    }
}
```

## add-missing-declaration

> The [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) declaration declares block-scoped local variables.
>
> (c) MDN

Chechout in 🐊[**Putout Editor**](https://putout.vercel.app/#/gist/68d114f01384084cc3bec0a5d75f2dfa/0bb5201d36ed27f74728921aca95a04efa35c82d).

### ❌ Example of incorrect code

```js
for (name of names) {
    alert(`hello ${name}`);
}
```

### ✅ Example of correct code

```js
for (const name of names) {
    alert(`hello ${name}`);
}
```

## map

> The [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method creates a new array populated with the results of calling a provided function on every element in the calling array.
>
> (c) MDN

### ❌ Example of incorrect code

```js
names.map((name) => {
    alert(`hello ${name}`);
});
```

### ✅ Example of correct code

```js
for (const name of names) {
    alert(`hello ${name}`);
}
```

## for-in

> The [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) statement iterates over all enumerable properties of an object that are keyed by strings.
>
> (c) MDN

### ❌ Example of incorrect code

```js
for (const item in object) {
    if (object.hasOwnProperty(item))
        log(item);
}

for (const item in object) {
    if (!object.hasOwnProperty(item))
        continue;
    
    log(item);
}
```

### ✅ Example of correct code

```js
for (const item of Object.keys(object)) {
    log(item);
}
```

## for-each

> The [`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method executes a provided function once for each array element.
>
> (c) MDN

### ❌ Example of incorrect code

```js
Object
    .keys(json)
    .forEach((name) => {
        manage(name, json[name]);
    });

[].forEach.call(arguments, (item) => {
    console.log(item);
});
```

### ✅ Example of correct code

```js
for (const name of Object.keys(json)) {
    manage(name, json[name]);
}

for (const item of arguments) {
    console.log(item);
}
```

## reduce

> - The [`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method executes a user-supplied **reducer** callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.
>
> (c) MDN

You should always look at second argument of a **reducer** since it changes logic drastically and should read back and forth a couple times to understand what is going on.

> Recursive functions like `.reduce()` can be powerful but sometimes difficult to understand, especially for less experienced **JavaScript** developers. If code becomes clearer when using other array methods, developers must weigh the readability tradeoff against the other benefits of using `.reduce()`. In cases where `.reduce()` is the best choice, documentation and semantic variable naming can help mitigate readability drawbacks.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#when_to_not_use_reduce)

Check it out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/107751499a4bbdd83b9181444d8bdbbd/8d3b646a3df0025d564e2bb141cc7f6a6bb1b3a5).

## ❌ Example of incorrect code

```js
const result = list.reduce((a, b) => a + b, 1);
```

## ✅ Example of correct code

```js
let sum = 1;

for (const a of list) {
    sum += a;
}
```

## remove-unused-variables

### ❌ Example of incorrect code

```js
for (const {a, b} of c) {
    console.log(a);
}
```

### ✅ Example of correct code

```js
for (const {a} of c) {
    console.log(a);
}
```

## remove-useless

> The `Array` enables storing a collection of multiple items under a single variable name.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

### ❌ Example of incorrect code

```js
for (const a of ['hello']) {
    console.log(a);
}
```

### ✅ Example of correct code

```js
console.log('hello');
```

## remove-useless-variables

### ❌ Example of incorrect code

```js
for (const a of b) {
    const {c} = a;
}
```

### ✅ Example of correct code

```js
for (const {c} of b) {}
```

## remove-useless-array-from

> The `Array.from()` static method creates a new, shallow-copied `Array` instance from an iterable or array-like object.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

### ❌ Example of incorrect code

```js
for (const x of Array.from(y)) {}
```

### ✅ Example of correct code

```js
for (const x of y) {}
```

## for

> The [`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) statement creates a loop that consists of three optional expressions, enclosed in parentheses and separated by semicolons, followed by a statement to be executed in the loop.
>
> (c) MDN

### for-n

#### ❌ Example of incorrect code

```js
const n = items.length;

for (let i = 0; i < n; i++) {
    const item = items[i];
    log(item);
}
```

#### ✅ Example of correct code

```js
for (const item of items) {
    log(item);
}
```

### for-length

#### ❌ Example of incorrect code

```js
for (let i = 0; i < array.length; i++) {
    const item = array[i];
    console.log(item);
}
```

#### ✅ Example of correct code

```js
for (const item of items) {
    log(item);
}
```

### for-entries

#### ❌ Example of incorrect code

```js
for (let i = 0; i < array.length; i++) {
    const item = array[i];
    console.log(i, item);
}
```

#### ✅ Example of correct code

```js
for (const [i, item] of array.entries()) {
    console.log(i, item);
}
```

### for-entries-n

#### ❌ Example of incorrect code

```js
const n = array.length;

for (let i = 0; i < n; i++) {
    const item = array[i];
    console.log(i, item);
}
```

#### ✅ Example of correct code

```js
for (const [i, item] of array.entries()) {
    console.log(i, item);
}
```

### to-for-n

> The `entries()` method of `Array` instances returns a new array iterator object that contains the key/value pairs for each index in the array.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

Index overwrites on each iteration so when it modified inside loop it has no effect so `for` should be used in this case. Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/635e6c8e99c1969a731e1502a70abf75/5a25ec70cf329da098ae971f46003bbe2567a111).

#### ❌ Example of incorrect code

```js
for (let [i, token] of tokens.entries()) {
    ++i;
}
```

#### ✅ Example of correct code

```js
const n = tokens.length;

for (let i = 0; i < n; i++) {
    ++i;
}
```

## License

MIT
