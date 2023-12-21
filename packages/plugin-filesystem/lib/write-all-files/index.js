'use strict';

const {operator} = require('putout');
const {
    findFile,
    writeFileContent,
    readFileContent,
} = operator;

module.exports.report = () => `Write all files`;

module.exports.fix = (file) => {
    const content = readFileContent(file);
    writeFileContent(file, content);
};

module.exports.scan = (root, {push, progress}) => {
    const files = findFile(root, ['*']);
    const n = files.length;
    
    for (const [i, file] of files.entries()) {
        push(file);
        progress({
            i,
            n,
        });
    }
};
