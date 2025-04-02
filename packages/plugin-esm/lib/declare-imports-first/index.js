import {types, operator} from 'putout';

const {
    isImportDeclaration,
    isExportDeclaration,
} = types;

const {replaceWith} = operator;
const isESMNode = (a) => isImportDeclaration(a) || isExportDeclaration(a);

export const report = () => `Declare imports first`;

export const fix = ({path, importPath}) => {
    let prev = path;
    let preventInfiniteLoop = 500;
    
    while (--preventInfiniteLoop) {
        const {node} = importPath;
        
        replaceWith(importPath, prev.node);
        replaceWith(prev, node);
        
        importPath = prev;
        prev = prev.getPrevSibling();
        
        if (!prev.node || prev.isImportDeclaration())
            return;
    }
};

export const traverse = ({push, pathStore}) => ({
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
            const all = pathStore();
            const esmNodes = all.filter(isESMNode);
            
            if (!esmNodes.length)
                return;
            
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
