'use strict';

const {types, operator} = require('putout');
const {remove, replaceWith} = operator;
const {
    VariableDeclarator,
    VariableDeclaration,
    ExportNamedDeclaration,
} = types;

const keywords = [
    'export',
    'const',
];

module.exports.report = () => `Extract 'export' from variable`;

module.exports.fix = ({path, keywordPath}) => {
    if (keywordPath.node.id.name === 'export')
        replaceWith(path, ExportNamedDeclaration(path.node));
    
    if (keywordPath.node.id.name === 'const')
        replaceWith(path, VariableDeclaration('const', [VariableDeclarator(path.node.expression.left, path.node.expression.right)]));
    
    remove(keywordPath);
};

module.exports.traverse = ({push}) => ({
    VariableDeclarator(path) {
        if (!keywords.includes(path.node.id.name))
            return;
        
        const topPath = getTopPath(path);
        const nextPath = topPath.getNextSibling();
        
        if (nextPath.isVariableDeclaration())
            return push({
                path: nextPath,
                keywordPath: path,
            });
        
        if (nextPath.isExpressionStatement() && nextPath.get('expression').isAssignmentExpression())
            return push({
                path: nextPath,
                keywordPath: path,
            });
    },
});

function getTopPath(path) {
    if (path.parentPath.parentPath.isExportDeclaration())
        return path.parentPath.parentPath;
    
    return path.parentPath;
}
