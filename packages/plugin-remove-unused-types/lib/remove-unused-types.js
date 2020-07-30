'use strict';

module.exports.report = ({node}) => `"${node.id.name}" is defined but never used`;

module.exports.fix = (path) => {
    path.remove();
};

const use = (store, name) => {
    const current = store(name);
    
    if (!current)
        return;
    
    current.used = true;
};

module.exports.traverse = ({push, store}) => {
    return {
        TSTypeAliasDeclaration(path) {
            if (path.parentPath.isExportNamedDeclaration())
                return;
            
            store(path.node.id.name, {
                path,
                used: false,
            });
        },
        TSTypeReference(path) {
            const {typeName} = path.node;
            const {name} = typeName;
            const current = store(name);
            
            use(store, name);
        },
        ExportSpecifier(path) {
            use(store, path.node.local.name);
        },
        ExportDefaultDeclaration(path) {
            const declarationPath = path.get('declaration');
            
            if (declarationPath.isIdentifier()) {
                const {name} = path.node.declaration;
                use(store, name);
            }
        },
        ObjectProperty(path) {
            const {value} = path.node;
            const {name} = value;
            
            use(store, name);
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
    };
};

