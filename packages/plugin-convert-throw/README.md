# @putout/plugin-convert-throw [![NPM version][NPMIMGURL]][NPMURL]

> This proposal defines new syntax to **throw** exceptions from within an expression context.
>
> (c) [tc39](https://github.com/tc39/proposal-throw-expressions#status)

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-throw.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-throw "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability convert **throw** statement to expression.

## Install

```
npm i @putout/plugin-convert-throw -D
```

## Rule

```json
{
    "rules": {
        "convert-throw": "on"
    },
    "plugins": [
        "convert-throw"
    ]
}
```

## ❌ Example of incorrect code

```js
const fn = () => {throw Error('hello');};
```

## ✅ Example of correct code

```js
const fn = () => throw Error('hello');
```

## License

MIT
