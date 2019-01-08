# Putout [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/putout.svg?style=flat&longCache=true
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/putout/master.svg?style=flat&longCache=true
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/putout.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/putout "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/putout  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout "Dependency Status"

[CoverageURL]:              https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

Putout is a tool for identifying, reporting and fixing patterns found in JavaScript code. It can:

- find and remove unused variables;
- find and remove `debugger` statement;
- find and replace `test.only` to `test` calls;
- find and remove `process.exit` call;

## Why?

- because [eslint](https://eslint.org) avoids [fixes that could change the runtime behavior](https://eslint.org/docs/developer-guide/working-with-rules#applying-fixes).
- because [babel](https://babeljs.io) produces [throw-away code](https://github.com/babel/babel/issues/5139);
- because [pretier](https://github.com/prettier/prettier) it is a formatter;
- because [jscodeshift](https://github.com/facebook/jscodeshift) has no `config` and `plugins` support.

The main difference of `putout` is saving code transformation results directly in a source code in a day-to-day baisis.

## Install

```
npm i putout -g
```

## Plugins

The `putout` repo is comprised of many npm packages. It is a [lerna](https://github.com/lerna/lerna) monorepo similar to [babel](https://github.com/babel/babel).

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@putout/plugin-remove-unused-variables`](/packages/plugin-remove-unused-variables) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-unused-variables.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-unused-variables) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-unused-variables)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-unused-variables) |
| [`@putout/plugin-remove-process-exit`](/packages/plugin-remove-process-exit) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-process-exit.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-process-exit) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-process-exit)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-process-exit) |
| [`@putout/plugin-remove-debugger`](/packages/plugin-remove-debugger) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-debugger.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-debugger) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-debugger)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-debugger) |
| [`@putout/plugin-remove-only`](/packages/plugin-remove-only) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-only.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-only) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-only)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-only) |
| [`@putout/plugin-remove-skip`](/packages/plugin-remove-skip) | [![npm](https://img.shields.io/npm/v/@putout/plugin-remove-skip.svg?maxAge=86400)](https://www.npmjs.com/package/@putout/plugin-remove-skip) | [![Dependency Status](https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-skip)](https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-skip) |

## Usage

To find `errors` use:

```
putout lib test
```

To `fix` it use:

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

