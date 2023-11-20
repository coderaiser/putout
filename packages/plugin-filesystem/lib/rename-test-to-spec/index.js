'use strict';

const {operator} = require('putout');
const {
    __filesystem,
    findFile,
    renameFile,
    getFilename,
} = operator;

module.exports.report = () => `Rename '*.test.*' to '.spec.*'`;

module.exports.fix = (path) => {
    const filename = getFilename(path);
    const newFilename = filename.replace('.test.', '.spec.');
    
    renameFile(path, newFilename);
};

module.exports.traverse = ({push}) => ({
    [__filesystem]: (path) => {
        findFile(path, '*.test.*').map(push);
    },
});
