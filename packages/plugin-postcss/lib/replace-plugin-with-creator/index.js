'use strict';

const {
    operator,
    template,
    types,
} = require('putout');

const {
    objectExpression,
    objectMethod,
    identifier,
    objectProperty,
} = types;

const {traverse, insertAfter} = operator;

const booleanExport = template.ast('module.exports.postcss = true');

module.exports.report = () => 'creator should be used instead of plugin';

module.exports.replace = () => ({
    'module.exports = __(__a, __b)': ({__a, __b}, path) => {
        path.node.right = __b;
        
        const returnPath = getReturnPath(__b);
        const onceFn = returnPath.node.argument;
        
        const nameProp = objectProperty(identifier('postcssPlugin'), __a);
        const onceProp = objectMethod('method', identifier('Once'), onceFn.params, onceFn.body);
        
        const object = objectExpression([nameProp, onceProp]);
        
        returnPath.node.argument = object;
        insertAfter(path, booleanExport);
        
        return path;
    },
});

function getReturnPath(node) {
    let returnPath;
    
    traverse(node, {
        ReturnStatement(path) {
            returnPath = path;
        },
    });
    
    return returnPath;
}
