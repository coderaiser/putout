# Putout [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/putout.svg?style=flat&longCache=true
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/putout/master.svg?style=flat&longCache=true
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/putout.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/coderaiser "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/putout  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout "Dependency Status"

[CoverageURL]:              https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

Find and remove unused variables, and also:

- find and remove `debugger` statement;

## Why?

Because [eslint does not remove unused variables](https://eslint.org/docs/rules/no-unused-vars).

## Install

```
npm i putout -g
```

## Usage

To see unused variables use:

```
putout lib test
```

To remove `unused variables` use:

```
putout lib test --fix
```

## API

### putout(source)

```js
const {readFileSync} = require('fs');
const source = readFileSync('./1.js', 'utf8');
console.log(source);
// outputs
`
const t = 'hello';
const m = t + '!';
`

const result = putout(source);
// returns
`
const t = 'hello';
`

const result2 = putout(result);
// returns
``

```

## License

MIT

