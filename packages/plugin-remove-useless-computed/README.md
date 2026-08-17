# @putout/plugin-remove-useless-computed [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-computed.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-computed "npm"

> The object initializer syntax also supports computed property names. That allows you to put an expression in square brackets `[]`, that will be computed and used as the property name.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `computed`.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/8ff1cbbd86b05b26ab8869aaadfd5ee9/ae1897595cebc256b7aa1534cfab2994621c1641).

## Install

```
npm i @putout/plugin-remove-useless-computed
```

## Rule

```json
{
    "rules": {
        "remove-useless-computed": "on"
    }
}
```

## ❌ Example of incorrect code

```js
export const replace = {
    ['section("@select", select(__args))']: ({__args}, path) => {
        __args.unshift(identifier('id'));
        return path;
    },
};
```

## ✅ Example of correct code

```js
export const replace = {
    'section("@select", select(__args))': ({__args}, path) => {
        __args.unshift(identifier('id'));
        return path;
    },
};
```

## License

MIT
