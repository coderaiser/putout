# @putout/plugin-webpack [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-webpack.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-webpack"npm"

`webpack` plugin helps to migrate to latest `webpack` version.

## Install

```
npm i @putout/plugin-webpack -D
```

## Rules

```json
{
    "rules": {
        "webpack/convert-loader-to-use": "on",
        "webpack/convert-query-loader-to-use": "on",
        "webpack/convert-node-to-resolve-fallback": "on"
    }
}
```

## convert-loader-to-use

Fixes webpack comilation error: `Compiling RuleSet failed: Exclamation mark separated loader lists has been removed in favor of the 'use' property with arrays (at ruleSet[1].rules[1].loader: style-loader!css-loader!clean-css-loader)`

### ❌ Example of incorrect code

```js
const rules = [{
    test: /\.css$/,
    loader: 'style-loader!css-loader!clean-css-loader',
}];
```

### ✅ Example of correct code

```js
const rules = [{
    test: /\.css$/,
    use: [
        'style-loader',
        'css-loader',
        'clean-css-loader',
    ],
}];
```

## convert-query-loader-to-use

Fixes webpack comilation error: `Compiling RuleSet failed: Query arguments on 'loader' has been removed in favor of the 'options' property`.

### ❌ Example of incorrect code

```js
const rules = [{
    test: /\.(png|gif|svg|woff|woff2|eot|ttf)$/,
    loader: 'url-loader?limit=50000',
}];
```

### ✅ Example of correct code

```js
const rules = [{
    test: /\.(png|gif|svg|woff|woff2|eot|ttf)$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 50_000,
        },
    }],
}];
```

## convert-node-to-resolve-fallback

Fixes webpack comilation error:

```
Module not found: Error: Can't resolve 'path'`

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.
```

### ❌ Example of incorrect code

```js
module.exports = {
    node: {
        path: 'empty',
    },
};
```

### ✅ Example of correct code

```js
module.exports = {
    resolve: {
        fallback: {
            path: false,
        },
    },
};
```

## License

MIT
