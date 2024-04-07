'use strict';

const {renameFiles} = require('../rename-files');

module.exports = renameFiles({
    type: 'module',
    mask: '*.mjs',
    rename(name) {
        return name.replace(/mjs$/, 'js');
    },
});
