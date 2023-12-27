'use strict';

const {operator} = require('putout');
const {readFileContent} = operator;

module.exports.report = () => `Read all files`;

module.exports.fix = (file) => {
    readFileContent(file);
};

module.exports.scan = (root, {push, trackFile}) => {
    for (const file of trackFile(root, ['*'])) {
        push(file);
    }
};
