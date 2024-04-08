'use strict';

const {operator} = require('putout');
const {renameFiles} = operator;

module.exports = renameFiles({
    type: 'module',
    mask: '*.mts',
    rename(name) {
        return name.replace(/mts$/, 'ts');
    },
});
