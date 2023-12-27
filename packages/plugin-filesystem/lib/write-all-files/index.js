'use strict';

const {operator} = require('putout');
const {
    writeFileContent,
    readFileContent,
} = operator;

module.exports.report = () => `Write all files`;

module.exports.fix = (file) => {
    const content = readFileContent(file);
    writeFileContent(file, content);
};

module.exports.scan = (root, {push, trackFile}) => {
    for (const file of trackFile(root, ['*'])) {
        push(file);
    }
};
