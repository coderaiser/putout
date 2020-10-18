# @putout/plugin-webpack [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-webpack.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-webpack"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/webpack?path=packages/plugin-webpack
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/webpack.svg?path=packages/plugin-webpack

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
    }
}
```

## convert-loader-to-use

Fixes webpack comilation error: `Compiling RuleSet failed: Exclamation mark separated loader lists has been removed in favor of the 'use' property with arrays (at ruleSet[1].rules[1].loader: style-loader!css-loader!clean-css-loader)`

### ❌ Incorrect code example

```js
const rules = [{
    test: /\.css$/,
    loader: 'style-loader!css-loader!clean-css-loader',
}];
```

### ✅ Correct code Example

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

### ❌ Incorrect code example

```js
const rules = [{
    test: /\.(png|gif|svg|woff|woff2|eot|ttf)$/,
    loader: 'url-loader?limit=50000',
}];
```

### ✅ Correct code Example

```js
const rules = [{
    test: /\.(png|gif|svg|woff|woff2|eot|ttf)$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 50000
        }
    }],
}];
```

## License

MIT

