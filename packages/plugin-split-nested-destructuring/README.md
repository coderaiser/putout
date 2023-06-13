# @putout/plugin-split-nested-destructuring [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-split-nested-destructuring.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-split-nested-destructuring "npm"

> - Don't use nested destructuring on data that comes from any external data sources (such as `REST API`s, `GraphQL` endpoints or files).
> - Don't use nested destructuring on function arguments that have long or complicated signatures.
>
> (c) [Destructuring in JavaScript: the not so good parts](https://goodguydaniel.com/blog/destructuring-not-so-good-parts)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to split nested destructuring.

## Install

```
npm i @putout/plugin-split-nested-destructuring -D
```

## Rule

```json
{
    "rules": {
        "split-nested-destructuring": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const {
    a: {
        b,
    },
    a: {
        b: x,
    },
} = c;

function f({a: {b}}) {
    console.log(b);
}
```

## ✅ Example of correct code

```js
const {a} = c;
const {b, b: x} = a;

function f({a}) {
    const {b} = a;
    console.log(b);
}
```

## License

MIT
