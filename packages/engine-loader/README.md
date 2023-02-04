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

- ☝️ [**Simple Plugin**](#simple-plugin)
- ☝️ [**Nested Plugin**](#nested-plugin)

### Simple Plugin

Simple is one of plugins support by [`@putout/engine-runner`](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#supported-plugin-types).

### Nested Plugin

Nested can contain one or more rules:

```js
module.exports.rules = {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
}
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

### loadProcessorsAsync

```js
const {loadProcessors} = require('@putout/engine-loader');
const optionalLoad = async (a) => await import(a);

const plugins = await loadProcessorsAsync({
    processors: [
        ['javascript', 'on'],
        ['markdown', 'off'],
    ],
}, optionalLoad);
```

### createAsyncLoader

Gives ability to create loader for `processor` or `formatter`.

```js
const {createAsyncLoader} = require('@putout/engine-loader');
const {loadProcessor} = createAsyncLoader('processor');

await loadProcessors('markdown');
// loads @putout/processor-markdown

await loadProcess('json', () => {
    return Promise.resolve(`will be called instead of 'import'`);
});
// loads @putout/processor-json using custom loader
```

## License

MIT
