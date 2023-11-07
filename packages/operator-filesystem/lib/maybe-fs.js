'use strict';

const {assign} = Object;
const noop = () => {};

const defaultFS = {
    renameFile: noop,
};

const maybeFS = assign({}, defaultFS);

module.exports.renameFile = (oldName, newName) => {
    maybeFS.renameFile(oldName, newName);
};

module.exports.init = (fsDriver) => {
    assign(maybeFS, fsDriver);
};

module.exports.deinit = () => {
    assign(maybeFS, defaultFS);
};
