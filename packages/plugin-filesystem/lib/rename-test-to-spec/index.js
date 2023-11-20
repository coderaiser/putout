'use strict';

const {operator} = require('putout');
const {
    findFile,
    __filesystem,
    renameFile,
    getFilename,
} = operator;

module.exports.report = () => `Rename '*.spec.*' to '.test.*'`;

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
