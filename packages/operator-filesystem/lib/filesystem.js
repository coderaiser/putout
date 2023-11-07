'use strict';

const {
    setLiteralValue,
    getProperty,
    traverseProperties,
} = require('@putout/operate');

const maybeFS = require('./maybe-fs');

module.exports.findFiles = (node, name) => {
    const filePaths = [];
    
    for (const filenamePath of traverseProperties(node, 'filename')) {
        const {value} = filenamePath.node.value;
        
        if (value === name || value.endsWith(`/${name}`)) {
            filePaths.push(filenamePath.parentPath);
        }
    }
    
    return filePaths;
};

module.exports.renameFile = (filePath, name) => {
    const filenamePath = getProperty(filePath, 'filename');
    const valuePath = filenamePath.get('value');
    const {value: oldName} = filenamePath.node.value;
    
    const baseName = oldName
        .split('/')
        .pop();
    
    const newName = oldName.replace(baseName, name);
    
    setLiteralValue(valuePath, newName);
    maybeFS.renameFile(oldName, newName);
};

module.exports.init = maybeFS.init;
module.exports.deinit = maybeFS.deinit;
