# putout-engine-loader [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/engine-loader.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/engine-loader"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/engine-loader
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/engine-loader

Load putout plugins.

## Install

```
npm i @putout/engine-loader
```

## Code Example

```js
const {loadPlugins} = require('@putout/engine-loader');

const pluginNames = [
    'remove-unusede-variables',
];

const rules = {
    'remove-unused-variables': 'on'
};

const plugins = loadPlugins({
    cache: true, //default
    pluginNames,
    rules,
});
```

## License

MIT

