'use strict';

const {operator} = require('putout');
const {
    findFile,
    getParentDirectory,
    createDirectory,
} = operator;

module.exports.report = () => `Create 'app' directory`;

module.exports.fix = (filePath) => {
    createDirectory(getParentDirectory(filePath, 'app'), 'app');
};

module.exports.scan = (path, {push}) => {
    const [filePath] = findFile(path, 'package.json');
    const [appPath] = findFile(path, 'app');
    
    if (!filePath || appPath)
        return;
    
    push(filePath);
};
