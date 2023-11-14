'use strict';

const {assign} = Object;
const noop = () => {};
const returns = (a) => () => a;

const defaultFS = {
    renameFile: noop,
    removeFile: noop,
    createDirectory: noop,
    readFileContent: returns(''),
    writeFileContent: noop,
};

const maybeFS = assign({}, defaultFS);

module.exports.renameFile = (oldName, newName) => {
    maybeFS.renameFile(oldName, newName);
};

module.exports.removeFile = (name) => {
    maybeFS.removeFile(name);
};

module.exports.createDirectory = (name) => {
    maybeFS.createDirectory(name);
};

module.exports.readFileContent = (name) => {
    return maybeFS.readFileContent(name);
};

module.exports.writeFileContent = (name) => {
    maybeFS.writeFileContent(name);
};

module.exports.init = (fsDriver) => {
    assign(maybeFS, fsDriver);
};

module.exports.deinit = () => {
    assign(maybeFS, defaultFS);
};
