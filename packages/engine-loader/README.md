# @putout/engine-loader [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/engine-loader.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/engine-loader"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) loader for `plugins` and `processors`.

## Install

```
npm i @putout/engine-loader
```

## Plugins

Loader supports two kinds of plugins:

- ☝️ [**Simple**](#simple-plugin)
- ☝️ [**Nested**](#nested-plugin)

### Simple Plugin

Simplest type of plugin support by [`@putout/engine-runner`](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#supported-plugin-types), contains one rule.

### Nested Plugin

Nested contains one or more rules:

```js
module.exports.rules = {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
};
```

## Env Variables

When you need to get things working with Yarn PnP, and using custom `plugins` `formatters` or `processers`, add env variable
`PUTOUT_YARN_PNP` with name of a package that contains dependencies you need.

## API

### loadPlugins

```js
const {loadPlugins} = require('@putout/engine-loader');

const pluginNames = [
    'remove-unusede-variables',
];

const rules = {
    'remove-unused-variables': 'on',
};

const plugins = loadPlugins({
    cache: true, //default
    pluginNames,
    rules,
});
```

#### Babel Plugins

You can use `babel plugins` with help of `babel/` prefix.

*Example*
Let's use two plugins:

- `babel-plugin-transform-inline-consecutive-adds`
- `@babel/plugin-codemod-object-assign-to-object-spread`

`@putout/engine-loader` will gues the prefix of `plugin` :).

```js
const pluginNames = [
    'babel/transform-inline-consecutive-adds',
    'babel/codemod-object-assign-to-object-spread',
];

const plugins = loadPlugins({
    pluginNames,
});
```

When you need to use imported babel plugin use `babelPlugin`:

```js
import {babelPlugin} from '@putout/engine-loader';
import transformBlockScoping from '@babel/plugin-transform-block-scoping';

const plugins = loadPlugins({
    pluginNames: [
        ['babel/transform-inline-consecutive-adds', babelPlugin(transformBlockScoping, 'Optional message')],
    ],
});
```

### loadProcessorsAsync

```js
const {loadProcessors} = require('@putout/engine-loader');
const optionalLoad = async (a) => await import(a);

const plugins = await loadProcessorsAsync({processors: [
    ['javascript', 'on'],
    ['markdown', 'off'],
]}, optionalLoad);
```

### createAsyncLoader

Gives ability to create loader for `processor` or `formatter`.

```js
const {createAsyncLoader} = require('@putout/engine-loader');
const {loadProcessor} = createAsyncLoader('processor');

// load @putout/processor-markdown
await loadProcessors('markdown');
// load @putout/processor-json using custom loader
await loadProcess('json', () => {
    return Promise.resolve(`will be called instead of 'import'`);
});
```

## License

MIT
