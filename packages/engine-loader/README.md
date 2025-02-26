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

When you want to make it disabled by default, use:

```js
module.exports.rules = {
    'remove-unused-variables': ['off', require('@putout/plugin-remove-unused-variables')],
};
```

So when someone using your plugin, he needs to enable it:

```json
{
    "rules": {
        "nested/remove-unused-variables": "on"
    },
    "plugins": ["nested"]
}
```

## Env Variables

When you need to get things working with Yarn OnP, and using custom `plugins` `formatters` or `processors`, add env variable
`PUTOUT_YARN_PNP` with name of a package that contains dependencies you need.

If you want to load from custom directory (for Visual Studio Code Extension, for example) use `PUTOUT_LOAD_DIR`.

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
    pluginNames,
    rules,
});
```

#### `import`

You can also use schema like this one:

```
import:escover/plugin
```

```js
const plugins = loadPlugins({
    pluginNames: [
        'import:commonjs-putout-plugin',
    ],
});
```

### loadPluginsAsync

Load **ESM** plugins:

```js
const {loadPluginsAsync} = require('@putout/engine-loader');

const pluginNames = [
    'remove-unusede-variables',
];

const rules = {
    'remove-unused-variables': 'on',
};

const plugins = await loadPluginsAsync({
    pluginNames,
    rules,
});
```

#### `import`

You can also use schema like this one:

```
import:escover/plugin
```

```js
const plugins = await loadPluginsAsync({
    pluginNames: [
        'import:escover/plugin',
    ],
});
```

Or when used `putoutAsync`:

```js
import {putoutAsync} from 'putout';

await putoutAsync(`module.exports.hello = 'world'`, {
    plugins: [
        'import:escover/plugin',
    ],
});
```

Which is the same as:

```js
import {putoutAsync} from 'putout';
import * as plugin from 'escover/plugin';

await putoutAsync(`module.exports.hello = 'world'`, {
    plugins: [
        ['escover/plugin', plugin],
    ],
});
```

Or used inside `.putout.json`:

```json
{
    "plugins": [
        "import:escover/plugin"
    ]
}
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

// load @putout/processor-markdown
await loadProcessors('markdown');
// load @putout/processor-json using custom loader
await loadProcess('json', () => {
    return Promise.resolve(`will be called instead of 'import'`);
});
```

### validateRules

```js
const {validateRules} = require('@putout/engine-loader');

const pluginNames = [];
const rules = {
    'remove-unused-variables': 'on',
};

validateRules({
    pluginNames,
    rules,
});

// throws since there is no plugin name passed that matches rule 'remove-unused-variables'
```

## License

MIT
