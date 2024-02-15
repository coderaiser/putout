'use strict';

const {operator} = require('putout');
const {readFileContent} = operator;

module.exports.report = () => `Read all files`;

module.exports.fix = (file) => {
    readFileContent(file);
};

module.exports.scan = (root, {push, options, trackFile}) => {
    const {mask = '*'} = options;
    
    for (const file of trackFile(root, mask)) {
        push(file);
    }
};
