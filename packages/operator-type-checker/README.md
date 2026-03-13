# @putout/operator-type-checker [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-type-checker.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-type-checker "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to create `type-checker`.

## Install

```
npm i putout @putout/operator-type-checker
```

## API

When you need to filter out all `CallExpression` nodes without `MemberExpression` inside, like: `fn('hello')`, but not `fn(a.b)`, use:

```js
const {operator} = require('putout');
const {createTypeChecker} = operator;

const check = createTypeChecker([
    '-: -> !MemberExpression',
    '+ parentPath -> CallExpression',
]);
```

## License

MIT
