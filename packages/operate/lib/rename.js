'use strict';

const {renameProperty} = require('./rename-property');

module.exports.rename = (path, from, to) => {
    path.scope.rename(from, to);
    renameProperty(path, from, to);
};

