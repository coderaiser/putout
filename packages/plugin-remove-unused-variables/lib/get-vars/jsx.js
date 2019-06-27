'use strict';

const {types} = require('putout');
const {isIdentifier} = types;

module.exports = (use) => ({
    JSXOpeningElement(path) {
        const {node} = path;
        const {name} = node;
        
        if (/^[A-Z]/.test(name.name))
            use(path, name.name);
        
        use(path, 'React');
    },
    
    JSXSpreadAttribute(path) {
        const argPath = path.get('argument');
        
        if (argPath.isIdentifier())
            return use(path, argPath.node.name);
    },
    
    JSXExpressionContainer(path) {
        const {node} = path;
        const {expression} = node;
        
        if (isIdentifier(expression))
            use(path, expression.name);
    },
});

