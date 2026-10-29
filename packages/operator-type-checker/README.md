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
    '+: parentPath -> CallExpression',
]);
```

## Coverage

The strong side of Type Checker is coverage reports:

> 🌴 Checkers Covered

To check coverage set `PUTOUT_INSTRUMENT=1` when running tests.

When you need to setup tests coverage check on ending of tests just use:

```js
import {callWhenTestsEnds} from 'supertape';
import {whenTestsEnds} from '@putout/printer/type-checker/when-tests-ends';

callWhenTestsEnds('PUTOUT_INSTRUMENT', whenTestsEnds);
```

It is already handled in `@putout/test`, so if you use it - you covered 😏.

## License

MIT
