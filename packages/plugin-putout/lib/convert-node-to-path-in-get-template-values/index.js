'use strict';

const {types, operator} = require('putout');

const {
    compare,
    replaceWith,
    getTemplateValues,
} = operator;

const {
    isVariableDeclarator,
    isArrayPattern,
} = types;

module.exports.report = () => '"path" should be used instead of "node" in getTemplateValues';

const GET_TEMPLATE_VALUES_NODE = 'getTemplateValues(__a.node, __b)';

module.exports.fix = ({path, __aPath, init}) => {
    if (compare(path, GET_TEMPLATE_VALUES_NODE)) {
        const {__a} = getTemplateValues(path, GET_TEMPLATE_VALUES_NODE);
        replaceWith(__aPath, __a);
        
        return;
    }
    
    replaceWith(__aPath, init);
};

module.exports.traverse = ({push}) => ({
    'getTemplateValues(__a, __b)': (path) => {
        const {scope} = path;
        const {bindings} = scope;
        const __aPath = path.get('arguments.0');
        
        if (isPathNode(__aPath)) {
            push({
                path,
                __aPath,
            });
            
            return;
        }
        
        const {name} = __aPath.node;
        
        if (name === 'parentPath')
            return;
        
        const binding = bindings[name];
        
        if (!binding)
            return;
        
        const bindingNode = binding.path.node;
        
        if (!isVariableDeclarator(bindingNode))
            return;
        
        if (isArrayPattern(bindingNode.id))
            return;
        
        const {init} = bindingNode;
        
        push({
            init,
            path,
            __aPath,
        });
    },
});

function isPathNode(path) {
    if (!path.isMemberExpression())
        return false;
    
    const propertyPath = path.get('property');
    
    return propertyPath.isIdentifier({
        name: 'node',
    });
}
