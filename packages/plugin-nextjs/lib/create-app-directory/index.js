'use strict';

const {operator} = require('putout');
const {
    findFile,
    getParentDirectory,
    createDirectory,
} = operator;

const FS = '__putout_processor_filesystem(__object)';

module.exports.report = () => `Create 'app' directory`;

module.exports.fix = (filePath) => {
    createDirectory(getParentDirectory(filePath, 'app'), 'app');
};

module.exports.traverse = ({push}) => ({
    [FS](path) {
        const [filePath] = findFile(path, 'package.json');
        const [appPath] = findFile(path, 'app');
        
        if (!filePath || appPath)
            return;
        
        push(filePath);
    },
});
