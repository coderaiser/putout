'use strict';

const {
    operator,
    template,
    types,
} = require('putout');

const {traverse} = operator;

const {
    ObjectProperty,
    ObjectMethod,
    Identifier,
    ObjectExpression,
} = types;

const booleanExport = template.ast('module.exports.postcss = true');

module.exports.report = () => 'creator should be used instead of plugin';

module.exports.replace = () => ({
    'module.exports = __(__a, __b)': ({__a, __b}, path) => {
        path.node.right = __b;
        
        const returnPath = getReturnPath(__b);
        const onceFn = returnPath.node.argument;
        
        const nameProp = ObjectProperty(Identifier('postcssPlugin'), __a);
        const onceProp = ObjectMethod('method', Identifier('Once'), onceFn.params, onceFn.body);
        
        const object = ObjectExpression([nameProp, onceProp]);
        
        returnPath.node.argument = object;
        path.insertAfter(booleanExport);
        
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
