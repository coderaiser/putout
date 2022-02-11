# @putout/plugin-simplify-logical-expressions [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-simplify-logical-expressions.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-simplify-logical-expressions "npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to simplify `logical-expressions`.

## Install

```
npm i @putout/plugin-simplify-logical-expressions -D
```

## Rule

```json
{
    "rules": {
        "simplify-logical-expressions": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const is = !(options && !options.bidirectional);

if (!left.type === 'UnaryExpression');
```

## ✅ Example of correct code

```js
const is = !options || options.bidirectional;

if (left.type !== 'UnaryExpression');
```

## License

MIT
