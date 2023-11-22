'use strict';

const {operator} = require('putout');
const {
    findFile,
    removeFile,
    __filesystem,
} = operator;

module.exports.report = ({name}) => `Remove '${name}'`;

module.exports.fix = ({path}) => {
    removeFile(path);
};

module.exports.traverse = ({push, options}) => ({
    [__filesystem](path) {
        const {names} = options;
        
        if (!names)
            return;
        
        for (const name of names) {
            const files = findFile(path, name);
            
            for (const file of files) {
                push({
                    name,
                    path: file,
                });
            }
        }
    },
});
