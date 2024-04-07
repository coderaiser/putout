'use strict';

const {operator} = require('putout');
const {renameFiles} = operator;

module.exports = renameFiles({
    type: 'commonjs',
    mask: '*.cjs',
    rename(name) {
        return name.replace(/cjs$/, 'js');
    },
});
