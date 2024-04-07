'use strict';

const {operator} = require('putout');
const {renameFiles} = operator;

module.exports = renameFiles({
    type: 'module',
    mask: '*.mjs',
    rename(name) {
        return name.replace(/mjs$/, 'js');
    },
});
