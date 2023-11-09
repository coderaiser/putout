'use strict';

const {renameSync: renameSyncOriginal, rmSync: rmSyncOriginal} = require('fs');

module.exports.renameFile = (from, to, {renameSync = renameSyncOriginal} = {}) => {
    renameSync(from, to);
};

module.exports.removeFile = (filename, {rmSync = rmSyncOriginal} = {}) => {
    rmSync(filename);
};
