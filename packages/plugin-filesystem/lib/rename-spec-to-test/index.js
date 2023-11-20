'use strict';

const {renameFileByMask} = require('../rename-file-by-mask');

module.exports = renameFileByMask({
    mask: '*.spec.*',
    from: 'spec',
    to: 'test',
});
