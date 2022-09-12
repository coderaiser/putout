# @putout/plugin-remove-iife [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-iife.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-iife"npm"

> An **IIFE** (Immediately Invoked Function Expression) is a **JavaScript** function that runs as soon as it is defined.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and remove **IIFE**.

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
