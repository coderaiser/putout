'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = ({node}) => `"${node.id.name}" is defined but never used`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push, upstore}) => ({
    TSTypeAliasDeclaration(path) {
        if (path.parentPath.isExportNamedDeclaration())
            return;
        
        upstore(path.node.id.name, {
            path,
        });
    },
    TSTypeReference(path) {
        const {typeName} = path.node;
        const {name} = typeName;
        
        upstore(name, {
            used: true,
        });
    },
    ExportSpecifier(path) {
        upstore(path.node.local.name, {
            used: true,
        });
    },
    ExportDefaultDeclaration(path) {
        const declarationPath = path.get('declaration');
        
        if (declarationPath.isIdentifier()) {
            const {name} = path.node.declaration;
            
            upstore(name, {
                used: true,
            });
        }
    },
    ObjectProperty(path) {
        const {value} = path.node;
        const {name} = value;
        
        upstore(name, {
            used: true,
        });
    },
    Program: {
        exit() {
            for (const {path, used} of upstore()) {
                if (used)
                    continue;
                
                if (!path.node)
                    continue;
                
                push(path);
            }
        },
    },
});
