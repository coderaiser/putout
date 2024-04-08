'use strict';

const {operator} = require('putout');
const {renameFiles} = operator;

module.exports = renameFiles({
    type: 'commonjs',
    mask: '*.cts',
    rename(name) {
        return name.replace(/cts$/, 'ts');
    },
});
