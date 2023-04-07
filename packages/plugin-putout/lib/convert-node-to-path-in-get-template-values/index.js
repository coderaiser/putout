'use strict';

const {
    types,
    operator,
} = require('putout');

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
        
        if (__aPath.isMemberExpression()) {
            push({
                path,
                __aPath,
            });
            
            return;
        }
        
        const {name} = __aPath.node;
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
