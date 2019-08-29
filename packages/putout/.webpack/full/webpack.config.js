'use strict';

const {resolve, join} = require('path');

const merge = require('webpack-merge');
const common = require('../webpack.config.js');

const {env} = process;
const isDev = env.NODE_ENV === 'development';

const dist = resolve(__dirname, '..', '..', 'dist');
const devtool = false;

module.exports = merge([
    common, {
        entry: {
            putout: join(__dirname, `./index.js`),
        },
        output: {
            path: dist,
        },
        
        resolve: {
            alias: {
                'module': resolve(__dirname, 'module.js'),
            },
        }
    }
]);

console.log(module.exports.output.path);

