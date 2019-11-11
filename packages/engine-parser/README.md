# putout-engine-parser [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/engine-parser.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/engine-parser"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/engine-parser
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/engine-parser

`putout` plugin adds ability to find and remove `debugger` statement.

## Install

```
npm i @putout/engine-parser
```

## API

### print(ast)

Print code from `ast`

### parse(code)

You can add `default options` for custom `parser` you use.

Supported parsers:
- [@babel/parse](https://babeljs.io/docs/en/babel-parser)
- [acorn](https://github.com/acornjs/acorn)
- [espree](https://github.com/eslint/espree)
- [esprima](https://esprima.org/)
- [tenko](https://github.com/pvdz/tenko)

## Example

### parse.ast(template)
create node using `memoization`.

### parse.ast.fresh(template)
create node without `memoization`.

Any parser should be installed before use, but you can be shure that `@babel/parse` always installed.

```js
const {parse} = require('@putout/engin-parser');
const parser = 'acorn';

const code = parse('var t = "hello"', {
    parser,
});
```

## License

MIT

