'use strict';

const {operator} = require('putout');
const {
    findFile,
    moveFile,
    renameFile,
} = operator;

module.exports.report = () => `Rename 'pages/404.js' to 'not-found.js'`;

module.exports.fix = (filePath, {dirPath}) => {
    renameFile(filePath, 'not-found.js');
    moveFile(filePath, dirPath);
};

module.exports.scan = (path, {push}) => {
    const [filePath] = findFile(path, '404.js');
    const [dirPath] = findFile(path, 'app');
    
    if (!filePath || !dirPath)
        return;
    
    push(filePath, {
        dirPath,
    });
};
