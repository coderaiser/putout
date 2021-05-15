'use strict';

module.exports.report = ({node}) => `"${node.id.name}" is defined but never used`;

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push, store}) => ({
    TSTypeAliasDeclaration(path) {
        if (path.parentPath.isExportNamedDeclaration())
            return;
        
        store(path.node.id.name, {
            path,
        });
    },
    
    TSTypeReference(path) {
        const {typeName} = path.node;
        const {name} = typeName;
        
        store(name, {
            used: true,
        });
    },
    
    ExportSpecifier(path) {
        store(path.node.local.name, {
            used: true,
        });
    },
    
    ExportDefaultDeclaration(path) {
        const declarationPath = path.get('declaration');
        
        if (declarationPath.isIdentifier()) {
            const {name} = path.node.declaration;
            store(name, {
                used: true,
            });
        }
    },
    
    ObjectProperty(path) {
        const {value} = path.node;
        const {name} = value;
        
        store(name, {
            used: true,
        });
    },
    
    Program: {
        exit() {
            for (const {path, used} of store()) {
                if (used)
                    continue;
                
                push(path);
            }
        },
    },
});

