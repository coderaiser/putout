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

### JSCodeshift

`@putout/engine-loader` supports loading transforms written for [jscodeshift](https://github.com/facebook/jscodeshift) with help of prefix `jscodeshift/`.

```js
const pluginNames = [
    'jscodeshift/async-await-codemod',
];

const rules = [
    'jscodeshift/async-await-codemod': ['on', 'any message you like :)'],
]

const plugins = loadPlugins({
    pluginNames,
    rules, // optional
});
```

### Babel Plugins

You can use `babel plugins` with help of `babel/` prefix.

*Example*
Let's use two plugins:
- `babel-plugin-transform-inline-consecutive-adds`
- `@babel/plugin-codemod-object-assign-to-object-spread`

`@putout/engine-loader` will gues the prefix of `plugin` :).

```js
const pluginNames = [
    'transform-inline-consecutive-adds',
    'codemod-object-assign-to-object-spread',
];

const plugins = loadPlugins({
    pluginNames,
});
```

## License

MIT

