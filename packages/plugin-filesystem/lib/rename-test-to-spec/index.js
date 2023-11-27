'use strict';

const {operator} = require('putout');
const {
    findFile,
    renameFile,
    getFilename,
} = operator;

module.exports.report = () => `Rename '*.test.*' to '.spec.*'`;

module.exports.fix = (path) => {
    const filename = getFilename(path);
    const newFilename = filename.replace('.test.', '.spec.');
    
    renameFile(path, newFilename);
};

module.exports.scan = (path, {push}) => {
    findFile(path, '*.test.*').map(push);
};
