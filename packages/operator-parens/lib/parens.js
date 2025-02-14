'use strict';

const {types} = require('@putout/babel');
const {
    ParenthesizedExpression,
    TSParenthesizedType,
} = types;

module.exports.hasParens = hasParens;

module.exports.addParens = (path) => {
    const printer = getPrinter(path);
    
    if (hasParens(path, printer))
        return path;
    
    if (printer !== 'babel') {
        const {extra = {}} = path.node;
        
        extra.parenthesized = true;
        path.node.extra = extra;
        
        return path;
    }
    
    const {node} = path;
    
    if (path.type.startsWith('TS'))
        return path.replaceWith(TSParenthesizedType(node));
    
    path.replaceWith(ParenthesizedExpression(node));
    
    return path;
};

module.exports.removeParens = (path) => {
    const printer = getPrinter(path);
    
    if (!hasParens(path, printer))
        return path;
    
    if (printer !== 'babel') {
        path.node.extra.parenthesized = false;
        return path;
    }
    
    const {node} = path;
    path.parentPath.replaceWith(node);
    
    return path;
};

function getPrinter(path) {
    const scope = path.scope.getProgramParent();
    const programPath = scope.path;
    
    return programPath.node.extra.__putout_printer;
}

function hasParens(path, printer = getPrinter(path)) {
    if (printer !== 'babel')
        return path.node.extra?.parenthesized;
    
    const {type} = path.parentPath;
    
    return /^(TS)?Parenthesized(Expression|Type)?$/.test(type);
}
