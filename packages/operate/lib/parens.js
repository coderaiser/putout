'use strict';

const {types} = require('@putout/babel');
const {
    ParenthesizedExpression,
    TSParenthesizedType,
} = types;

module.exports.addParens = (path) => {
    const printer = getPrinter(path);
    
    if (printer !== 'babel') {
        const {extra = {}} = path.node;
        
        extra.parenthesized = true;
        path.node.extra = extra;
        
        return;
    }
    
    const {node} = path;
    
    if (path.type.startsWith('TS'))
        return path.replaceWith(TSParenthesizedType(node));
    
    path.replaceWith(ParenthesizedExpression(node));
};

module.exports.removeParens = (path) => {
    const printer = getPrinter(path);
    
    if (printer !== 'babel')
        return path.node.extra.parenthesized = false;
    
    const {node} = path;
    path.parentPath.replaceWith(node);
};

function getPrinter(path) {
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    
    return programPath.node.extra.__putout_printer;
}
