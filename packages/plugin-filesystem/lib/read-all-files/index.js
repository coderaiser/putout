'use strict';

const {operator} = require('putout');
const {
    findFile,
    readFileContent,
} = operator;

module.exports.report = () => `Read all files`;

module.exports.fix = (file) => {
    readFileContent(file);
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
