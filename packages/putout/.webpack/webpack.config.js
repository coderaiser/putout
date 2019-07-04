'use strict';

const path = require('path');
const webpack = require('webpack');
const dir = './lib';

const {env} = process;
const isDev = env.NODE_ENV === 'development';

const dist = path.resolve(__dirname, '..', 'dist');
const distDev = path.resolve(__dirname, '..', 'dist-dev');
const devtool = false;

const babelDev = {
    plugins: [
        'module:babel-plugin-macros',
    ],
};

const rules = [{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: babelDev,
}];

module.exports = {
    devtool,
    entry: {
        putout: path.join(__dirname, `./index.js`),
    },
    output: {
        library: 'putout',
        filename: '[name].js',
        path: isDev ? distDev : dist,
        pathinfo: isDev,
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate,
    },
    plugins: [
        new webpack.IgnorePlugin({
           checkResource(context) {
            return /^esprima|fixture|^acorn|espree|tape|@putout\/test/.test(context);
          },
        }),
    ],
    module: {
        rules,
    },
    resolve: {
        alias: {
            module: path.resolve(__dirname, 'module.js'),
        }
    },
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000,
    },
};

function devtoolModuleFilenameTemplate(info) {
    const resource = info.absoluteResourcePath.replace(__dirname + path.sep, '');
    return `file://putout/${resource}`;
}

