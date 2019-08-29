'use strict';

const {IgnorePlugin} = require('webpack');
const merge = require('webpack-merge');

const common = require('../webpack.config.js');

module.exports = merge([
    common, {
        plugins: [
            new IgnorePlugin({
                checkResource(context) {
                    return /fixture|acorn|espree|jscodeshift|@babel\/core|tape|@putout\/test/.test(context);
                },
            }),
        ],
    }
]);

