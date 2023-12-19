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

module.exports.scan = (root, {push}) => {
    findFile(root, ['*']).map(push);
};
