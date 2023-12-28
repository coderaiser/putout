'use strict';

const {operator} = require('putout');
const {removeFile, getFilename} = operator;

module.exports.report = (file, {names}) => `Remove file '${names}': '${getFilename(file)}'`;

module.exports.fix = (file) => {
    removeFile(file);
};

module.exports.scan = (path, {push, trackFile, options}) => {
    const {names} = options;
    
    if (!names)
        return;
    
    for (const file of trackFile(path, names)) {
        push(file, {
            names,
        });
    }
};
