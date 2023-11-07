'use strict';

const {renameSync: renameSyncOriginal} = require('fs');

module.exports.renameFile = (from, to, {renameSync = renameSyncOriginal} = {}) => {
    renameSync(from, to);
};
