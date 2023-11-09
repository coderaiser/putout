'use strict';

const {operator} = require('putout');
const {renameFile, findFile} = operator;

const FS = '__putout_processor_filesystem(__object)';

module.exports.report = ({from, to}) => `Rename '${from}' to '${to}'`;

module.exports.fix = ({path, to}) => {
    renameFile(path, to);
};

module.exports.traverse = ({push, options}) => {
    const {from, to} = options;
    
    if (!from || !to)
        return {};
    
    return {
        [FS](path) {
            const files = findFile(path, from);
            
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
