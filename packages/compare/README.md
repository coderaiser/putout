# @putout/compare [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/compare.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/compare "npm"

Compare AST-nodes according to 🦎[**PutoutScript**](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#-putoutscript).

## Install

```
npm i @putout/compare
```

## API

### getTemplateValues(node, template)

Get template values from `node` according to 🦎**PutouScript** `template`.

- `node` - `AST-node` or `code` that will be generated;
- `template` - 🦎**PutouScript**;

```js
const {operator} = require('putout');
const {template} = operator;
const node = template.ast('const [] = a');

getTemplateValues(node, 'const __array = array');
// returns
({
    __array: {
        type: 'ArrayPattern',
    },
});
```

### compare(node: string | Node, template: string | Node [, options: Options])

- `node` - `AST-node` or `code` that will be generated;
- `template` - `AST-node` with support of `template variables`.
- `options` - (optional) - object with properties:
  - `findUp` (default: `true`) - find up template node;

### compareAll(node: string | Node, templates: string[] | Node|Nodes[], [, options: Options])

Compare nodes feats `templates`.

### compareAny(node: string | Node, templates: string[] | Node|Nodes[], [, options: Options])

Compare any nodes that feats one of `templates `

```js
compareAny(path, 'const __a = __b', {
    findUp: false,
});
```

#### Supported template variables:

##### __

Any node.

```js
compare('const x = data', 'const __ = __');
compare('const {x} = data', 'const __ = __');
compare('const x = {data}', 'const __ = __');
compare('<h1>hello</h1>', '<h1>__</h1>');
// returns
true;
```

##### __object

`ObjectPattern` or `ObjectExpression` with any count of `properties`.

```js
compare('const {} = data', 'const __object = __');
compare('const {hello} = data', 'const __object = __');
// returns
true;
```

##### __array

`ArrayPattern` or `ArrayExpression` with any count of `elements`.

```js
compare('const [] = data', 'const __array = __');
compare('const [hello] = data', 'const __array = __');
compare('const hello = [data]', 'const __ = __array');
// returns
true;
```

##### __args, __args__a

Any count of `arguments`:

```js
compare('(a, b, c) => {}', '(__args) => {}');
compare('(a, b) => {}', '(__args) => {}');
compare('() => {}', '(__args) => {}');
// returns
true;
```

Or linked `arguments`:

```js
compare('((a) => fn(a))(value)', '((__args__a) => __c(__args__a))(__args__b)');
// returns
true;

compare('((a) => fn(42))(value)', '((__args__a) => __c(__args__a))(__args__b)');
// returns
false;
```

##### __imports

Any count of `import specifiers`:

```js
compare('import React, {Component} from "react"', 'import __imports from "react"');
// returns
true;
```

##### __exports

Any count of `export specifiers`:

```js
compare('export {scan, fix, report}', 'export {__exports}');
// returns
true;
```

##### "__"

Any string literal.

```js
compare('const a = "hello"', 'const __ = "__"');
```

##### __a

Linked node.

```js
compare('const __a = "hello"', 'const __a = "hello"');
```

##### "__a"

Linked string literal.

```js
compare('const a = "hello"', 'const __a = "__b"');
```

##### `__a`

Linked template literal.

```js
compare('const a = `hello`', 'const __a = `__b`');
// returns
true;
```

##### __body

Any `BlockStatement`.

```js
compare('const a = () => 0', 'const a = () => __body');
// returns
false;

compare('const a = () => {}', 'const a = () => __body');
// returns
true;

compare('function a(b) {return b;}', 'function __(__args) {__body}');
// returns
true;

compare(`class a {hello: 'world'}`, 'class __a {__body}');
// returns
true;
```

##### __jsx_children

Any count of children of `JSXElement`:

```js
compare('<div hello="world"></div>', '<div hello="world">__jsx_children</div>');
// returns
true;

compare('<div hello="world"><span>hi</span></div>', '<div hello="world">__jsx_children</div>');
// returns
true;
```

##### __jsx_attributes

Any count of attributes of `JSXElement`:

```js
compare('<div hello="world"></div>', '<__a __jsx_attributes/>');
// returns
true;
```

##### __nop

Any `Function` with no `arguments` and empty body;

```js
compare('const a = () => {}', 'const __a = __nop');
// returns
true;

compare('const a = async () => {}', 'const a = __nop');
// returns
true;
```

##### __identifier

Any `Identifier`

```js
compare('const a = 5', 'const __identifier = 5');
// returns
true;
```

##### __bool

Any `Boolean`

```js
compare('const a = true', 'const a = __bool');
// returns
true;
```

##### /__a/

Any `regexp`

```js
compare('const a = /hello/g', 'const a = /__a/');
// returns
true;
```

##### `__type_params`

Any count of TSTypeParameter's.

```js
compare('function clear<es, ax, di>() {}', 'function __a<__type_params>(): __c {__body}');
// returns
true;
```

## License

MIT
