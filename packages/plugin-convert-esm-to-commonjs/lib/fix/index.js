'use strict';

const {
    isExportNamedDeclaration,
    isExportDefaultDeclaration,
    isImportDeclaration,
} = require('putout').types;

const {
    convertNamedExport,
    convertDefaultExport,
} = require('./export');

const {convertImport} = require('./import');

module.exports = (path) => {
    const {node} = path;
    
    if (isExportNamedDeclaration(node))
        return convertNamedExport(path);
    
    if (isExportDefaultDeclaration(node))
        return convertDefaultExport(path);
    
    if (isImportDeclaration(node)) {
        return convertImport(path);
    }
};

