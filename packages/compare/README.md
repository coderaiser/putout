# putout-compare [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/compare.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/compare"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/compare
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/compare

Compare AST-nodes.

## Install

```
npm i @putout/compare
```

## API

### Compare (node, baseNode)

- `node` - `AST-node` or `code` that will be generated;
- `baseNode` `AST-node` with support of `template variables`.

#### Supported template variables:

##### __

Any node.

```js
compare('const x = data', 'const __ = __');
compare('const {x} = data', 'const __ = __');
compare('const x = {data}', 'const __ = __');
// returns
true
```

##### __object

`ObjectPattern` or `ObjectExpression` with any count of `properties`.

```js
compare('const {} = data', 'const __object = __')
compare('const {hello} = data', 'const __object = __')
// returns
true
```

##### __array

`ArrayPattern` or `ArrayExpression` with any count of `elements`.

```js
compare('const [] = data', 'const __array = __');
compare('const [hello] = data', 'const __array = __');
compare('const hello = [data]', 'const __ = __array');
// returns
true
```

##### __args

Any count of `arguments`:

```js
compare('(a, b, c) => {}', '(__args) => {}');
compare('(a, b) => {}', '(__args) => {}');
compare('() => {}', '(__args) => {}');
// returns
true
```

##### "__"
Any string literal.

```js
compare('const a = "hello"', 'const __ = "__"');
```

##### "__a"
Linked string literal.

```js
compare('const a = "hello"', 'const __a = "__b"');
```

## License

MIT

