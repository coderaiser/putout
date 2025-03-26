'use strict';

const {renameFileByMask} = require('../rename-file-by-mask');

module.exports = renameFileByMask({
    mask: '*.test.*',
    from: 'test',
    to: 'spec',
});
