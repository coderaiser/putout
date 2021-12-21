# @putout/engine-loader [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/engine-loader.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/engine-loader"npm"

Load putout `plugins`, `processors`.

## Install

```
npm i @putout/engine-loader
```

## Env Variables

When you need to get things working with Yarn PnP, and using custom `plugins` `formatters` or `processers`, add env variable
`PUTOUT_YARN_PNP` with name of a package that contains dependencies you need.

## Code Example

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

### loadProcessors

```js
const {loadProcessors} = require('@putout/engine-loader');

const plugins = loadProcessors({
    processors: [
        ['javascript', 'on'],
        ['markdown', 'off'],
    ],
});
```

## License

MIT
