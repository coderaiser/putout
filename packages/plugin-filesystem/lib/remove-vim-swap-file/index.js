'use strict';

const {operator} = require('putout');
const {removeFile} = operator;

module.exports.report = () => `Remove vim swap file`;

module.exports.fix = (filePath) => {
    removeFile(filePath);
};

module.exports.scan = (path, {push, trackFile}) => {
    for (const file of trackFile(path, '*.swp')) {
        push(file);
    }
};
