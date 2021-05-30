# Operate [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operate.svg?style=flat&longCache=true
[BuildStatusIMGURL]: https://img.shields.io/travis/coderaiser/putout/master.svg?style=flat&longCache=true
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/operate
[NPMURL]: https://npmjs.org/package/putout "npm"
[BuildStatusURL]: https://travis-ci.org/coderaiser/putout "Build Status"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/operate "Dependency Status"
[CoverageURL]: https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

`operate` provide you a way to manipulate `path` nodes and keep `comments` and `loc` information.

## Install

```
npm i @putout/operate
```

If you write plugin for `putout` you already have `operator` in `putout`, all exampes will get `operator` from `putout`, but you can use direct `require('@putout/operate')` as well.

## API

### replaceWith(path, node)

```js
const {replaceWith} = require('putout').operator;
replaceWith(path, ContinueStatement);
```

### replaceWithMultiple(path, nodes)

```js
const {replaceWithMultiple} = require('putout').operator;

replaceWith(path, [
    ExpressionStatement(path.node.argument),
    ContinueStatement,
]);
```

### isModuleExports(path)

Check if currentPath is `module.exports` expression.

### toExpression(node)

Can be used to convert node to `expression` when building new nodes.

### remove(path)

Remove `node`, preserve comments.

## getPathAfterImports(body)

Get next `path` after latest `ImportDeclaration`:

```js
const programPath =  path.scope.getProgramParent().path;
const afterImportsPath = getPathAfterImports(programPath.get('body'));
```

## License

MIT
