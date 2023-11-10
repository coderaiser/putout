'use strict';

const {operator} = require('putout');
const {
    findFile,
    moveFile,
    renameFile,
} = operator;

const FS = '__putout_processor_filesystem(__object)';

module.exports.report = () => `Rename 'pages/404.js' to 'not-found.js'`;

module.exports.fix = ({path, dirPath}) => {
    renameFile(path, 'not-found.js');
    moveFile(path, dirPath);
};

module.exports.traverse = ({push}) => ({
    [FS](path) {
        const [filePath] = findFile(path, '404.js');
        const [dirPath] = findFile(path, 'app');
        
        if (!filePath || !dirPath)
            return;
        
        push({
            path: filePath,
            dirPath,
        });
    },
});
