'use strict';

const {types, operator} = require('putout');

const {remove, compareAny} = operator;
const {values} = Object;

const {
    isImportDefaultSpecifier,
    isImportNamespaceSpecifier,
    isImportDeclaration,
} = types;

module.exports.report = () => `Avoid duplicate imports`;

module.exports.fix = ({path, imports}) => {
    const all = [];
    
    for (const imp of imports) {
        const {specifiers} = imp.node;
        
        for (const spec of specifiers) {
            if (isImportDefaultSpecifier(spec)) {
                path.node.specifiers.unshift(spec);
                continue;
            }
            
            if (compareAny(spec, path.node.specifiers))
                continue;
            
            all.push(spec);
        }
        
        remove(imp);
    }
    
    path.node.specifiers.push(...all);
};

module.exports.traverse = ({push, pathStore}) => ({
    ImportDeclaration(path) {
        pathStore(path);
    },
    Program: {
        exit: () => {
            const imports = pathStore().filter(isImportDeclaration);
            processImports(push, imports);
        },
    },
});

function processImports(push, imports) {
    const {get, add} = duplicatesStore();
    const importDefaults = new Map();
    
    for (const path of imports) {
        const {source, specifiers} = path.node;
        
        const {value} = source;
        
        if (specifiers.find(isImportNamespaceSpecifier))
            continue;
        
        const count = importDefaults.get(value) || 0;
        
        const importDefaultCount = count + specifiers.filter(isImportDefaultSpecifier).length;
        
        importDefaults.set(value, importDefaultCount);
    }
    
    for (const path of imports) {
        const {source, specifiers} = path.node;
        
        const {value} = source;
        
        if (specifiers.find(isImportNamespaceSpecifier))
            continue;
        
        if (importDefaults.get(value) > 1)
            continue;
        
        add(value, path);
    }
    
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
