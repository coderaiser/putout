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

module.exports.fix = ({path, nextPath}) => {
    if (path.node.id.name === 'export')
        replaceWith(nextPath, ExportNamedDeclaration(nextPath.node));
    
    if (path.node.id.name === 'const')
        replaceWith(nextPath, VariableDeclaration('const', [VariableDeclarator(nextPath.node.expression.left, nextPath.node.expression.right)]));
    
    remove(path);
};

module.exports.traverse = ({push}) => ({
    VariableDeclarator(path) {
        if (!keywords.includes(path.node.id.name))
            return;
        
        const topPath = getTopPath(path);
        const nextPath = topPath.getNextSibling();
        
        if (nextPath.isVariableDeclaration())
            return push({
                path,
                nextPath,
            });
        
        if (nextPath.isExpressionStatement() && nextPath.get('expression').isAssignmentExpression())
            return push({
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
