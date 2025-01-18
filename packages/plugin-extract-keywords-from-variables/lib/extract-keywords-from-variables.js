'use strict';

const {types, operator} = require('putout');
const buildDeclaration = (type) => (path) => {
    const {left, right} = path.node.expression;
    replaceWith(path, VariableDeclaration(type, [VariableDeclarator(left, right)]));
};

const {
    ImportDefaultSpecifier,
    ImportDeclaration,
    ExportNamedDeclaration,
    VariableDeclarator,
    VariableDeclaration,
} = types;

const {remove, replaceWith} = operator;

const keywords = [
    'export',
    'const',
    'var',
    'let',
    'import',
];

const builders = {
    const: buildDeclaration('const'),
    var: buildDeclaration('var'),
    let: buildDeclaration('let'),
    import: buildImport,
    export: buildExport,
};

module.exports.report = ({name}) => `Extract '${name}' from variable`;

module.exports.fix = ({path, nextPath}) => {
    const {name} = path.node.id;
    
    builders[name](nextPath);
    remove(path);
};

module.exports.traverse = ({push}) => ({
    VariableDeclarator(path) {
        const {name} = path.node.id;
        
        if (!keywords.includes(name))
            return;
        
        const topPath = getTopPath(path);
        const nextPath = topPath.getNextSibling();
        
        if (nextPath.isVariableDeclaration())
            return push({
                name,
                path,
                nextPath,
            });
        
        if (nextPath.isExpressionStatement())
            return push({
                name,
                path,
                nextPath,
            });
    },
});

function getTopPath(path) {
    if (path.parentPath.parentPath.isExportDeclaration())
        return path.parentPath.parentPath;
    
    return path.parentPath;
}

function buildExport(path) {
    replaceWith(path, ExportNamedDeclaration(path.node));
}

function buildImport(path) {
    const fromPath = path.getNextSibling();
    const sourcePath = fromPath.getNextSibling();
    const source = sourcePath.node.expression;
    const local = path.node.expression;
    
    replaceWith(path, ImportDeclaration([ImportDefaultSpecifier(local, local)], source));
    remove(sourcePath);
    remove(fromPath);
}
