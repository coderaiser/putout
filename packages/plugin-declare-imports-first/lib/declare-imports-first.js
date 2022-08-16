'use strict';

const {replaceWith} = require('putout').operator;

module.exports.report = () => `Declare imports first`;

module.exports.fix = ({path, importPath}) => {
    let prev = path;
    let preventInfiniteLoop = 500;
    
    while(--preventInfiniteLoop) {
        const {node} = importPath;
        
        replaceWith(importPath, prev.node);
        replaceWith(prev, node);
        
        importPath = prev;
        prev = prev.getPrevSibling();
        
        if (!prev.node || prev.isImportDeclaration())
            return;
    }
};

module.exports.traverse = ({push, pathStore}) => ({
    ImportDeclaration: (path) => {
        pathStore(path);
    },
    ExportNamedDeclaration: (path) => {
        const {source} = path.node;
        
        if (!source)
            return;
        
        pathStore(path);
    },
    ExportAllDeclaration: (path) => {
        pathStore(path);
    },
    Program: {
        exit: () => {
            for (const importPath of pathStore()) {
                if (importPath) {
                    const path = importPath.getPrevSibling();
                    
                    if (!path.node)
                        continue;
                    
                    if (path.isImportDeclaration())
                        continue;
                    
                    if (path.isExportDeclaration())
                        continue;
                    
                    push({
                        path,
                        importPath,
                    });
                }
            }
        },
    },
});

