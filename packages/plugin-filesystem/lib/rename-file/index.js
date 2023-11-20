'use strict';

const {operator} = require('putout');
const {
    renameFile,
    findFile,
    getFilename,
    __filesystem,
} = operator;

module.exports.report = ({from, to}) => `Rename '${from}' to '${to}'`;

module.exports.fix = ({path, from, to}) => {
    const filename = getFilename(path);
    const newFilename = filename.replace(from, to);
    
    renameFile(path, newFilename);
};

module.exports.traverse = ({push, options}) => {
    const {
        from,
        to,
        find,
    } = options;
    
    if (!from || !to)
        return {};
    
    return {
        [__filesystem](path) {
            const files = findFile(path, find || from);
            
            for (const file of files) {
                push({
                    path: file,
                    from,
                    to,
                });
            }
        },
    };
};
