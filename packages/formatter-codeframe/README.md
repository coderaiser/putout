# putout-formatter-codeframe [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/formatter-codeframe.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/formatter-codeframe "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/formatter-codeframe
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-codeframe

`putout` formatter shows codeframe of file with an errors.

## Install

```
npm i putout @putout/formatter-codeframe -g
```

## Usage

```
putout --format codeframe lib
```

Possible output:

```sh
/home/coderaiser/putout/packages/putout/lib/putout.js:3:0
  1 | 'use strict';
  2 |
> 3 | debugger;
    | ^ Unexpected "debugger" statement
  4 |
  5 | const recast = require('recast');
  6 | const toBabel = require('estree-to-babel');

✖ 1 errors in 1 files
  fixable with the `--fix` option
```

## License

MIT

