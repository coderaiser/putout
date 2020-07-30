'use strict';

module.exports.report = ({node}) => `"${node.id.name}" is defined but never used`;

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push, store}) => {
    return {
        TSTypeAliasDeclaration(path) {
            store(path.node.id.name, {
                path,
                used: false,
            });
        },
        TSTypeReference(path) {
            const {typeName} = path.node;
            const {name} = typeName;
            const current = store(name);
            
            if (!current)
                return;
            
            current.used = true;
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

