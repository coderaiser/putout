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

By default [`@putout/printer`](https://github.com/putoutjs/printer) used. It formats code according to [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#readme) rules but without using **ESLint**.

But you can also use `babel` with:

```js
const ast = parse(source);
const code = print(ast, {
    printer: 'babel',
});
```

When you need to pass options, use:

```js
const code = print(ast, {
    printer: ['putout', {
        format: {
            indent: '    ',
        },
    }],
});

print(ast, {
    printer: ['babel', {
        alginSpaces: false, // when you don't want to add spaces on empty lines
    }],
});
```

### print(ast [, options])

Print code from `ast`

### parse(code, [, options])

You can add `default options` for custom `parser` you use.

### template.fresh(code)

`parse` without `memoization`.

### template.ast(code)

create node using `memoization`.

### template.ast.fresh(code)

create node without `memoization`.

### template.extractExpression(code)

Extract `expression` node from `ExpressionStatement`.

#### Generate sourcemaps using Babel

To generate sourcemap using babel generator, you should use babel parser before.
This is low level transformation, because `Babel` doesn't preserve any formatting.

```js
const {generate} = require('@putout/engine-parser');
const {parse} = require('@putout/engine-parser/babel');

const ast = parse(source, {
    sourceFilename: 'hello.js',
});

generate(ast, {sourceMaps: true}, {
    'hello.js': source,
});

// returns
({
    code,
    map,
});
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
