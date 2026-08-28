# @putout/plugin-convert-webpack-to-rspack [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-webpack-to-rspack.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-webpack-to-rspack "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin to convert `webpack.config.js` to [rspack](https://rspack.dev). *Not bundled*.

## Install

```
npm i putout @putout/plugin-convert-webpack-to-rspack -D
```

## Rules

- ✅ [apply-rspack-import](#apply-rspack-import)
- ✅ [apply-swc-loader](#apply-swc-loader)
- ✅ [apply-asset-type](#apply-asset-type)
- ✅ [apply-library-object](#apply-library-object)
- ✅ [remove-webpackbar](#remove-webpackbar)

## Config

```json
{
    "rules": {
        "convert-webpack-to-rspack/apply-rspack-import": "on",
        "convert-webpack-to-rspack/apply-swc-loader": "on",
        "convert-webpack-to-rspack/apply-asset-type": "on",
        "convert-webpack-to-rspack/apply-library-object": "on",
        "convert-webpack-to-rspack/remove-webpackbar": "on"
    }
}
```

## apply-rspack-import

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/6af7c06cecb5e2b5717271dddd783fcf/fb2b92aa42bb5c1dadd2d5d5fb98ca06d2b6ee0d).

### ❌ Example of incorrect code

```js
import webpack from 'webpack';

const {EnvironmentPlugin} = webpack;
```

### ✅ Example of correct code

```js
import {rspack} from '@rspack/core';

const {EnvironmentPlugin} = rspack;
```

## apply-swc-loader

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/d26a479c7f677bcfe74f9f946c514983/c88686d689396c1e47b22d8aee24e737eff7e24f).

### ❌ Example of incorrect code

```js
export default {
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
        }],
    },
};
```

### ✅ Example of correct code

```js
export default {
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'builtin:swc-loader',
            options: {
                jsc: {
                    parser: {
                        syntax: 'ecmascript',
                    },
                },
                env: {
                    targets: 'defaults',
                },
            },
        }],
    },
};
```

## apply-asset-type
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/6d4152d33dd67f39ef4a1d56769dc22b/a6d7b603f326717a462c01fb9568e4f989ca7af7).

### ❌ Example of incorrect code

```js
export default {
    module: {
        rules: [{
            test: /\.(png|gif|svg)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 50_000,
                },
            },
        }],
    },
};
```

### ✅ Example of correct code

```js
export default {
    module: {
        rules: [{
            test: /\.(png|gif|svg)$/,
            type: 'asset',
            parser: {
                dataUrlCondition: {
                    maxSize: 50_000,
                },
            },
        }],
    },
};
```

## apply-library-object

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/c9b85da3e385d1c254f4103db8952323/1b7c7c9e8568bba9070469ced671c1dd5022bed3).

### ❌ Example of incorrect code

```js
export default {
    output: {
        library: 'Deepword',
        libraryTarget: 'var',
        libraryExport: 'default',
    },
};
```

### ✅ Example of correct code

```js
export default {
    output: {
        library: {
            name: 'Deepword',
            type: 'var',
            export: 'default',
        },
    },
};
```

## remove-webpackbar

### ❌ Example of incorrect code

```js
import WebpackBar from 'webpackbar';

export default {
    plugins: [new WebpackBar()],
};
```

### ✅ Example of correct code

```js
export default {
    plugins: [],
};
```
