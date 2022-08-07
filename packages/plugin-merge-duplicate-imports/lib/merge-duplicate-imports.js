'use strict';

const {
    types,
    operator,
} = require('putout');

const {remove} = operator;

const {values} = Object;
const {
    isImportDefaultSpecifier,
    isImportNamespaceSpecifier,
} = types;

module.exports.report = () => `Avoid duplicate imports`;

module.exports.fix = ({path, imports}) => {
    const all = path.node.specifiers;
    
    for (const path of imports) {
        const {specifiers} = path.node;
        
        all.push(...specifiers);
        remove(path);
    }
};

module.exports.traverse = ({push, pathStore}) => ({
    ImportDeclaration(path) {
        pathStore(path);
    },
    
    Program: {
        exit: () => {
            processImports(push, pathStore());
        },
    },
});

function processImports(push, imports) {
    const {get, add} = duplicatesStore();
    let importDefaultCount = 0;
    
    for (const path of imports) {
        const {
            source,
            specifiers,
        } = path.node;
        
        const {value} = source;
        
        if (specifiers.find(isImportNamespaceSpecifier))
            continue;
        
        add(value, path);
        importDefaultCount += specifiers.filter(isImportDefaultSpecifier).length;
    }
    
    if (importDefaultCount > 1)
        return;
    
    for (const list of get()) {
        if (list.length === 1)
            continue;
        
        const [path, ...imports] = list;
        push({
            path,
            imports,
        });
    }
}

function duplicatesStore() {
    const duplicates = [];
    
    const get = () => values(duplicates);
    const add = (value, path) => {
        duplicates[value] = duplicates[value] || [];
        duplicates[value].push(path);
    };
    
    return {
        get,
        add,
    };
}

