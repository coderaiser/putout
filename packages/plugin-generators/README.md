# @putout/plugin-generators [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-generators.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-generators"npm"

> The `function*` declaration creates a binding of a new generator function to a given name. A generator function can be exited and later re-entered, with its context (variable bindings) saved across re-entrances.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin improves `Generator`-related code.

## Install

```
npm i @putout/plugin-generators -D
```

## Rules

- ✅ [add-missing-star](#add-missing-star);
- ✅ [convert-multiple-to-generator](#convert-multiply-to-generator);

## Config

```json
{
    "rules": {
        "generators/add-missing-star": "on",
        "generators/convert-multiple-to-generator": "on"
    }
}
```

## add-missing-star

> The `function*` declaration creates a binding of a new generator function to a given name.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

### ❌ Example of incorrect code

```js
function hello() {
    yield;
    'world';
}

function func2() {
    yield * func1();
}
```

### ✅ Example of correct code

```js
function* hello() {
    yield 'world';
}

function* func2() {
    yield* func1();
}
```

## convert-multiply-to-generator

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/1c5326b470677a2ab253963fe39971f2/860b7eafb0bdd33ec007e709e7825c47bbc38940).

### ❌ Example of incorrect code

```js
const a = 5 * function hello() {};
```

### ✅ Example of correct code

```js
const a = 5;

function* hello() {}
```

## License

MIT
