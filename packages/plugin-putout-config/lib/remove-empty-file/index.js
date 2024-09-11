'use strict';

const {operator} = require('putout');
const {
    readFileContent,
    removeFile,
} = operator;

module.exports.report = () => `Remove empty '.putout.json'`;

module.exports.fix = (filePath) => {
    removeFile(filePath);
};

module.exports.scan = (path, {push, trackFile}) => {
    for (const file of trackFile(path, '.putout.json')) {
        const data = readFileContent(file);
        
        if (data.startsWith('{}'))
            push(file);
    }
};
