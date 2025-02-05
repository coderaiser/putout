# @putout/operator-keyword [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-keyword.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-keyword "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to lint keyword.

## Install

```
npm i putout @putout/operator-keyword
```

## API

```js
import {operator} from 'putout';

const {
    isKeyword,
    isTSKeyword,
    isDeclarationKeyword,
    isModuleDeclarationKeyword,
    isConditionKeyword,
} = operator;

isKeyword('if');
// returns
true;

isKeyword('abc');
// returns
false;

isDeclarationKeyword('const');
// returns
true;

isModuleDeclarationKeyword('import');
// returns
true;

isConditionKeyword('if');
// returns
true;

isStatementKeyword('for');
// returns
true;

isTSKeyword('implements');
// returns
true;
```

## License

MIT
