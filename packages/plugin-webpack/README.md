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

## License

MIT

