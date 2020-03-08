# Operate [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/putout.svg?style=flat&longCache=true
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/putout/master.svg?style=flat&longCache=true
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/putout
[NPMURL]:                   https://npmjs.org/package/putout "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/putout  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/operate "Dependency Status"

[CoverageURL]:              https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

`operate` provide you a way to manipulate `path` nodes and keep `comments` and `loc` information you need
to build the same source file you had before parsing with help of `recast`.

## Install

```
npm i @putout/operate
```

If you use write plugin for `putout` you already have `operate` in `putout`, all exampes will get `operate` from `putout`, but you can use direct `require` as well.

## API
### replaceWith(path, node)

```js
const {replaceWith} = require('putout').operate;
replaceWith(path, ContinueStatement);
```

### replaceWithMultiple(path, nodes)

```js
const {replaceWithMultiple} = require('putout').operate;

replaceWith(path, [
    ExpressionStatement(path.node.argument),
    ContinueStatement,
]);
```

### isModuleExports(path)

Check if currentPath is `module.exports` expression.

### toExpression(node)

Can be used to convert node to `expression` when building new nodes.

## License

MIT

