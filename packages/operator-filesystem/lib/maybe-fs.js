'use strict';

const {assign} = Object;
const noop = () => {};

const defaultFS = {
    renameFile: noop,
    removeFile: noop,
};

const maybeFS = assign({}, defaultFS);

module.exports.renameFile = (oldName, newName) => {
    maybeFS.renameFile(oldName, newName);
};

module.exports.removeFile = (name) => {
    maybeFS.removeFile(name);
};

module.exports.init = (fsDriver) => {
    assign(maybeFS, fsDriver);
};

module.exports.deinit = () => {
    assign(maybeFS, defaultFS);
};
