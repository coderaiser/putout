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

```js
    const {compare} = require('@putout/compare');
    compare('const a = {}', 'const a = {}');
    compare('const a = {}', 'const __ = {}');
    compare('const a = "hello"', 'const __ = "__"');
    // returns
    true
```

## License

MIT

