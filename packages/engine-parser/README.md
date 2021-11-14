# @putout/engine-parser [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/engine-parser.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/engine-parser"npm"

`putout` engine that parses input.

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

Any parser should be installed before use, but you can be shure that `@babel/parse` always installed.

## API

### print(ast)

Print code from `ast`

### parse(code)

You can add `default options` for custom `parser` you use.

### parse.fresh(code)

`parse` without `memoization`.

### parse.ast(template)

create node using `memoization`.

### parse.ast.fresh(template)

create node without `memoization`.

## Example

```js
const {parse} = require('@putout/engin-parser');
const parser = 'acorn';

const code = parse('var t = "hello"', {
    parser,
});
```

## License

MIT
