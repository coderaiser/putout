'use strict';

const {operator} = require('putout');
const {findFile, removeFile} = operator;

module.exports.report = () => `Remove vim swap file`;

module.exports.fix = (filePath) => {
    removeFile(filePath);
};

module.exports.scan = (path, {push}) => {
    findFile(path, '*.swp').map(push);
};
