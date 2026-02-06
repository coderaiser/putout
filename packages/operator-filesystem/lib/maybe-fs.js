import {fullstore} from 'fullstore';

const driverStore = fullstore();

const {assign} = Object;
const noop = () => {};
const returns = (a) => () => a;

const defaultFS = {
    renameFile: noop,
    removeFile: noop,
    createDirectory: noop,
    readFileContent: returns(''),
    writeFileContent: noop,
    copyFile: noop,
};

const maybeFS = assign({}, defaultFS);

export const renameFile = (oldName, newName) => {
    maybeFS.renameFile(oldName, newName);
};

export const removeFile = (name) => {
    maybeFS.removeFile(name);
};

export const copyFile = (from, to) => {
    maybeFS.copyFile(from, to);
};

export const createDirectory = (name) => {
    maybeFS.createDirectory(name);
};

export const readFileContent = (name) => {
    return maybeFS.readFileContent(name);
};

export const writeFileContent = (name, content) => {
    maybeFS.writeFileContent(name, content);
};

export const inject = (fsDriver) => {
    assign(maybeFS, fsDriver);
};

export const pause = () => {
    driverStore(maybeFS);
    eject();
};

export const start = () => {
    inject(driverStore());
};

export function eject() {
    assign(maybeFS, defaultFS);
}
