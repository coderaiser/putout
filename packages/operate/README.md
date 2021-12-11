# Operate [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMURL]: https://npmjs.org/package/putout "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operate.svg?style=flat&longCache=true
[BuildStatusURL]: https://travis-ci.org/coderaiser/putout "Build Status"
[BuildStatusIMGURL]: https://img.shields.io/travis/coderaiser/putout/master.svg?style=flat&longCache=true
[CoverageURL]: https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

`operate` provide you a way to manipulate `path` nodes and keep `comments` and `loc` information.

## Install

```
npm i @putout/operate
```

If you write plugin for `putout` you already have `operator` in `putout`, all exampes will get `operator` from `putout`, but you can use direct `require('@putout/operate')` as well.

## API

### `extract(path)`

Extract node value according to it's type::

- if it is `Identifier` return `name`;
- if it is any type of `Literal` return `value`;
- if it is `RegExp` return `pattern`;
- if it is `TemplateLiteral` return `qusis[0].value.raw`;
- if it is `TemplateElement` return `value.raw`;
- if it is `ClassMethod` return `key`;
- `throw` in other cases

### `replaceWith(path, node)`

```js
const {
    operator,
    types,
} = require('putout');

const {replaceWith} = operator;
const {ContinueStatement} = types;

replaceWith(path, ContinueStatement());
```

### `replaceWithMultiple(path, nodes)`

```js
const {
    operator,
    types,
} = require('putout');

const {replaceWithMultiple} = operator;
const {
    ExpressionStatement,
    ContinueStatement,
} = types;

replaceWithMultiple(path, [
    ExpressionStatement(path.node.argument),
    ContinueStatement,
]);
```

### `isModuleExports(path)`

Check if currentPath is `module.exports` expression.

### `toExpression(node)`

Can be used to convert node to `expression` when building new nodes.

### `remove(path)`

Remove `node`, preserve comments.

## `getPathAfterImports(body)`

Get next `path` after latest `ImportDeclaration`:

```js
const programPath =  path.scope.getProgramParent().path;
const afterImportsPath = getPathAfterImports(programPath.get('body'));
```

## `getBinding(path, name)`

Get binding by name using starting from `path` and move up.

```js
getBinding(path, 'hello');
```

## `getBindingPath(path, name)`

Get binding `path` by name using starting from `path` and move up.

```js
getBindingPath(path, 'hello');
```

## License

MIT
