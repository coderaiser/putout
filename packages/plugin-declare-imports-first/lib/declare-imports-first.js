'use strict';

module.exports.report = () => `Declare imports first`;

const {replaceWith} = require('putout').operator;

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

module.exports.traverse = ({push, listStore}) => ({
    ImportDeclaration: (path) => {
        listStore(path);
    },
    Program: {
        exit: () => {
            for (const importPath of listStore()) {
                if (importPath) {
                    const path = importPath.getPrevSibling();
                    
                    if (path.node && !path.isImportDeclaration() && importPath.node)
                        push({
                            path,
                            importPath,
                        });
                }
            }
        },
    },
});

