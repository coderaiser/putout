'use strict';

const {operator} = require('putout');
const {removeFile} = operator;

module.exports.report = () => `Remove '.nyc_output' directory`;

module.exports.fix = (filePath) => {
    removeFile(filePath);
};

module.exports.scan = (path, {push, trackFile}) => {
    for (const file of trackFile(path, '.nyc_output')) {
        push(file);
    }
};
