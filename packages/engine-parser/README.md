# @putout/engine-parser [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/engine-parser.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/engine-parser "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) engine that parses input.

## Install

```
npm i @putout/engine-parser
```

## Supported parsers

- [@babel/parse](https://babeljs.io/docs/en/babel-parser)
- [acorn](https://github.com/acornjs/acorn)
- [espree](https://github.com/eslint/espree)
- [esprima](https://esprima.org/)
- [tenko](https://github.com/pvdz/tenko)

Any parser should be installed before use, but you can be sure that `@babel/parse` always installed.

## API

You can avoid using [`recast`](https://github.com/putoutjs/recast) and speed up parsing and printing a bit using only Babel using:

```js
const ast = parse(source, {
    recast: false,
});

const code = print(ast, {
    recast: false,
});
```

### print(ast [, options])

Print code from `ast`

### parse(code, [, options])

You can add `default options` for custom `parser` you use.

### parse.fresh(code)

`parse` without `memoization`.

### parse.ast(template)

create node using `memoization`.

### parse.ast.fresh(template)

create node without `memoization`.

### Sourcemaps

You have two ways to benefit from source map generation:

- using `Recast` print;
- using `Babel` generator;

#### Generate sourcemaps using Recast

```js
const source = `const hello = 'world';`;
const ast = parse(source, {
    sourceFileName: 'hello.js',
});

print(ast, {sourceMapName: 'hello.map'});
// returns
`const hello = 'world';
{"version":3,"sources":["hello.js"],"names":[],"mappings":"AAAA...","file":"hello.map","sourcesContent":["const hello = 'world';"]}`;
```

#### Generate sourcemaps using Babel

To generate sourcemap using babel generator, you should use babel parser before.
This is low level transformation, because `Babel` doesn't preserve any formatting.

```js
const {generate} = require('@putout/engine-parser');
const babel = require('@putout/engine-parser/babel');

const ast = babel.parse(source, {
    sourceFilename: 'hello.js',
});

generate(ast, {sourceMaps: true}, {
    'hello.js': source,
});
// returns
({code, map});
```

## Example

```js
const {parse} = require('@putout/engine-parser');
const parser = 'acorn';

const code = parse('var t = "hello"', {
    parser,
});
```

## License

MIT
