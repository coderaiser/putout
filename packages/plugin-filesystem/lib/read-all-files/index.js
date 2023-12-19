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

module.exports.scan = (root, {push}) => {
    findFile(root, ['*']).map(push);
};
