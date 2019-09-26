'use strict';

const {resolve, join} = require('path');

const merge = require('webpack-merge');
const common = require('../webpack.config.js');

const path = resolve(__dirname, '..', '..', 'dist');

module.exports = merge([
    common, {
        entry: {
            putout: join(__dirname, `./index.js`),
        },
        output: {
            path,
        },
        
        resolve: {
            alias: {
                module: resolve(__dirname, 'module.js'),
            },
        },
    },
]);

