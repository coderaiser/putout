'use strict';

const {renameFiles} = require('../rename-files');

module.exports = renameFiles({
    type: 'commonjs',
    mask: '*.cjs',
    rename(name) {
        return name.replace(/cjs$/, 'js');
    },
});
