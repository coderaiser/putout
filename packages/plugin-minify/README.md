# @putout/plugin-minify [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-putout.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-putout "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds support of minifiers used in [`@putout/minify`](https://github.com/putoutjs/minify) and [`minify`](https://github.com/coderaiser/minify).

## Install

```
npm i @putout/plugin-putout -D
```

## Rules

```json
{
    "rules": {
        "minify/apply-ternary": "on",
        "minify/convert-var-to-const": "on",
        "minify/convert-if-to-logical": "on",
        "minify/convert-strict-equal-to-equal": "on",
        "minify/extract-body": "on",
        "minify/expand-bindings": "on",
        "minify/mangle-names": "on",
        "minify/merge-variables": "on",
        "minify/remove-var-undefined": "on",
        "minify/remove-return-undefined": "on",
        "minify/shorten-names": "on",
        "minify/types": "on"
    }
}
```

## apply-ternary

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/69329ca15ca7b13a91caa17bbfd64327/57d98ae86d557596dbab396be3cd2d093b625ec4).

### ❌ Example of incorrect code

```js
if (a)
    b();
else
    c();
```

### ✅ Example of correct code

```js
a ? b() : c();
```

## convert-if-to-logical

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/7e7c679157ba7e3746c581c29f77c58d/3c726a73315c8511735b7cb2699d54ef1299aede).

### ❌ Example of incorrect code

```js
if (a)
    console.log('hello');

if (b) {
    console.log('hello');
    console.log('world');
}

if (a) {
    console.log(1);
    console.log(2);
} else {
    console.log(3);
    console.log(4);
}
```

### ✅ Example of correct code

```js
a && console.log('hello');

b && (console.log('hello'), console.log('world'));

a ? (console.log(1), console.log(2)) : (console.log(3), console.log(4));
```

## convert-const-to-var

### ❌ Example of incorrect code

```js
const a = 5;
```

### ✅ Example of correct code

```js
var a = 5;
```

## convert-strict-equal-to-equal

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2ccbf7da6b22b32c0ba21a39b56ad20a/94664abd32cddc122458f43eb39ce8d776ad08cd).

### ❌ Example of incorrect code

```js
a === b;
```

### ✅ Example of correct code

```js
a === b;
```

## extract-body

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/fc3b90ac00754c99711c316fd632f4d9/443d4c1bc04e6416185d827c1483f1c2fafce88c).

### ❌ Example of incorrect code

```js
if (x) {
    return;
}

const hello = () => {
    return 'world';
};
```

### ✅ Example of correct code

```js
if (x)
    return;

const hello = () => 'world';
```

## expand-bindings

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f181577b923e9a9efca794d9abf1d6c8/1a70c7ebb4af18901ad250c34c8f78ec7519a732).

### ❌ Example of incorrect code

```js
const y = 'abc';
const x = y;
const fn = require(x);

const a = 5;
const b = a;
const c = b;

fn(c);
```

### ✅ Example of correct code

```js
require('abc')(5);
```

## remove-var-undefined

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/76ceb3f2604e887d7fe84e4b145db5f3/1be2301c0fa753f77090ca0d09df9a5ba1c0a819).

### ❌ Example of incorrect code

```js
var a = undefined;
```

### ✅ Example of correct code

```js
var a;
```

## remove-return-undefined

### ❌ Example of incorrect code

```js
const fn = () => {
    if (a)
        return undefined;
    
    return undefined;
};
```

### ✅ Example of correct code

```js
const fn = () => {
    if (a)
        return;
};
```

## mangle-names

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e6d28e60dcd6a6a84066136e8856d7d2/530e143bf2ece70938bd970065c28ed0acd6f5a4).

### ❌ Example of incorrect code

```js
function generate() {
    const hello = 'hi';
    return hello;
}
```

### ✅ Example of correct code

```js
function generate() {
    const a = 'hi';
    return a;
}
```

## merge-variables

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/31255c05343aa1b1c116a6a639a02d13/ba723cfb4abf475cd3f1bc2fe6908638cff92881).

### ❌ Example of incorrect code

```js
var a, b;
```

### ✅ Example of correct code

```js
var a;
var b;
```

## shorten-names

Feats good to [`@putout/plugin-declare`](https://github.com/coderaiser/putout/tree/master/packages/plugin-declare#readme).
Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/b1cbf117d57db1528bfad90bb4c3c07e/e85216221a1bd9595820ad64640859eec5fd0c3b).

### ❌ Example of incorrect code

```js
const a = (b) => {
    Object.keys(b);
};

const b = (keys) => {
    Object.keys(keys);
};

Object.freeze(a);
Object.defineProperty(b);
```

### ✅ Example of correct code

```js
const a = (b) => {
    keys(b);
};

const b = (keys) => {
    Object.keys(keys);
};

freeze(a);
defineProperty(b);
```

## types

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/208d2f64b68be114e1f9f93cf4b60734/bdae9887bbf05719e365920d60f3b0b7ca29702b).

### ❌ Example of incorrect code

```js
const a = undefined;
const b = true;
const c = false;
```

### ✅ Example of correct code

```js
const a = void 0;
const b = !0;
const c = !1;
```

## License

MIT
