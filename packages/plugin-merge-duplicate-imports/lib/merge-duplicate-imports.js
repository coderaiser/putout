'use strict';

const {types} = require('putout');

const {values} = Object;
const {
    isImportDefaultSpecifier,
    isImportNamespaceSpecifier,
} = types;

module.exports.report = () => `Avoid duplicate imports`;

module.exports.fix = ({path, imports}) => {
    const all = path.node.specifiers;
    convertImportKind(path);
    
    for (const path of imports) {
        convertImportKind(path);
        const {specifiers} = path.node;
        
        all.push(...specifiers);
        path.remove();
    }
    
    path.scope.getProgramParent().crawl();
};

module.exports.traverse = ({push, listStore}) => ({
    ImportDeclaration(path) {
        listStore(path);
    },
    
    Program: {
        exit: () => {
            processImports(push, listStore());
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

function convertImportKind(path) {
    if (path.node.importKind !== 'type')
        return;
    
    for (const spec of path.node.specifiers)
        spec.importKind = 'type';
    
    path.node.importKind = 'value';
}
