# putout-engine-runner [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/engine-runner.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/engine-runner"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/engine-runner
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/engine-runner

Load putout plugins.

## Install

```
npm i @putout/engine-runner
```

## Example

```js
const {runPlugins} = require('@putout/engine-runner');
const {parse} = require('@putout/engin-parser');

const plugins = [{
    rule: "remove-debugger",
    msg: "",        // optional
    options: {},    // optional
    plugin:
        include: () => ['debugger'],
        fix: (path) => path.remove(),
        report: () => `debugger should not be used`,
}];

const ast = parse('const m = "hi"; debugger');
const places = runPlugins({
    ast,
    shebang: false,     // default
    fix: true,          // default
    fixCount: 1         // default
    plugins,
    parser: 'babel',    // default
});
```

## License

MIT

