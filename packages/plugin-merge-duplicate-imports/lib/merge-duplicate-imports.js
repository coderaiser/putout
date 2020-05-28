'use strict';

const {types} = require('putout');

const {isImportDefaultSpecifier} = types;
const {entries} = Object;

module.exports.report = () => `Duplicate imports should be avoided`;

module.exports.fix = ({path, imports}) => {
    const all = path.node.specifiers;
    
    for (const path of imports) {
        const {specifiers} = path.node;
        
        all.push(...specifiers);
        path.remove();
    }
};

module.exports.find = (ast, {traverse, push}) => {
    const imports = [];
    const duplicates = {};
    
    traverse(ast, {
        ImportDeclaration: (path) => {
            imports.push(path);
        },
    });
    
    let importDefaultCount = 0;
    
    for (const path of imports) {
        const {
            source,
            specifiers,
        } = path.node;
        const {value} = source;
        
        importDefaultCount += specifiers.filter(isImportDefaultSpecifier).length;
        
        duplicates[value] = duplicates[value] || [];
        duplicates[value].push(path);
    }
    
    if (importDefaultCount > 1)
        return;
    
    for (const [name, list] of entries(duplicates)) {
        if (list.length === 1)
            continue;
        
        const [path, ...imports] = list;
        push({
            path,
            imports,
        });
    }
};
