'use strict';

const {operator} = require('putout');
const {
    findFile,
    removeFile,
    getFilename,
} = operator;

module.exports.report = (file, {names}) => `Remove file '${names}': '${getFilename(file)}'`;

module.exports.fix = (file) => {
    removeFile(file);
};

module.exports.scan = (path, {push, options}) => {
    const {names} = options;
    
    if (!names)
        return;
    
    for (const file of findFile(path, names)) {
        push(file, {
            names,
        });
    }
};
