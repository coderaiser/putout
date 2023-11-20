'use strict';

const {operator} = require('putout');
const {
    renameFile,
    findFile,
    getFilename,
    __filesystem,
} = operator;

const report = ({mask, from, to}) => {
    if (!mask)
        return `Rename '${from}' to '${to}'`;
    
    return `Rename '${mask}' to '${mask.replace(from, to)}'`;
};

module.exports.renameFileByMask = ({mask, from, to} = {}) => {
    return {
        fix,
        report,
        traverse: traverse({
            mask,
            from,
            to,
        }),
    };
};

function fix({path, from, to}) {
    const filename = getFilename(path);
    const newFilename = filename.replace(from, to);
    
    renameFile(path, newFilename);
}

const traverse = (baseOptions) => ({push, options}) => {
    const from = options.from || baseOptions.from;
    const to = options.to || baseOptions.to;
    const mask = options.mask || baseOptions.mask;
    
    if (!from || !to)
        return {};
    
    return {
        [__filesystem](path) {
            const files = findFile(path, mask || from);
            
            for (const file of files) {
                push({
                    path: file,
                    from,
                    to,
                    mask,
                });
            }
        },
    };
};
