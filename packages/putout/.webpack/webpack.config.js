'use strict';

const {
    sep,
    join,
    resolve,
} = require('path');
const webpack = require('webpack');

const {env} = process;
const pathinfo = env.NODE_ENV === 'development';

const path = resolve(__dirname, '..', 'slim');
const devtool = false;

const options = {
    plugins: [
        'module:babel-plugin-macros',
    ],
};

const rules = [{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options,
}];

module.exports = {
    devtool,
    entry: {
        putout: join(__dirname, '../lib/putout.js'),
    },
    output: {
        library: 'putout',
        filename: '[name].js',
        path,
        pathinfo,
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate,
    },
    plugins: [
        new webpack.IgnorePlugin({
            checkResource(context) {
                return /fixture|jscodeshift|@babel\/core|tape|@putout\/test/.test(context);
            },
        }),
    ],
    module: {
        rules,
    },
    resolve: {
        alias: {
            './run-babel-plugins': resolve(__dirname, 'run-babel-plugins.js'),
            './parse-options': resolve(__dirname, 'parse-options.js'),
            './wrap-plugin': resolve(__dirname, 'wrap-plugin.js'),
            'module': resolve(__dirname, 'module.js'),
        },
    },
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000,
    },
};

function devtoolModuleFilenameTemplate(info) {
    const resource = info.absoluteResourcePath.replace(__dirname + sep, '');
    return `file://putout/${resource}`;
}

