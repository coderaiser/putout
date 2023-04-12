# @putout/plugin-remove-iife [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-iife.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-iife"npm"

> An **IIFE** (Immediately Invoked Function Expression) is a **JavaScript** function that runs as soon as it is defined.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove **IIFE**.
Check out in 🐊**Putout Editor**:

- ✅ [getting read of `IIFE`](https://putout.cloudcmd.io/#/gist/e4c8fb3bdf6beb33b693a4ee0892d9aa/93296ca2fd22e502a584f95ce5c5e3a7ae838e2f) using **Linked Template Values**[(`__a`](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#__a));
- ✅ [getting read of `IIFE`](https://putout.cloudcmd.io/#/gist/42c19f103b40d86b1d20d7201306c5e3/c752dcc2d80fe90ca2431ad952a5fdc32a780492) using **Linked Args** [(`__args__a`)](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#__args__a);

## Install

```
npm i @putout/plugin-remove-iife
```

## Rule

```json
{
    "rules": {
        "remove-iife": "on"
    }
}
```

## ❌ Example of incorrect code

```js
(function() {
    console.log('hello');
})();

((a) => fn(a))(value);
((a, b) => fn(a, b))(value, value2);
```

## ✅ Example of correct code

```js
console.log('hello');
fn(value);
fn(value, value2);
```

## License

MIT
