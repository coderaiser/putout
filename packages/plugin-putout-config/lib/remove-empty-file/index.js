'use strict';

const {operator} = require('putout');
const {
    readFileContent,
    findFile,
    removeFile,
} = operator;

module.exports.report = () => `Remove empty '.putout.json'`;

module.exports.fix = (filePath) => {
    removeFile(filePath);
};

module.exports.scan = (path, {push}) => {
    for (const file of findFile(path, '.putout.json')) {
        const data = readFileContent(file);
        
        if (data === '{}')
            push(file);
    }
};
