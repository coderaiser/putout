'use strict';

const {types, operator} = require('putout');
const {
    identifier,
    objectProperty,
    objectExpression,
    booleanLiteral,
} = types;
const {replaceWith} = operator;

module.exports.report = () => '"resolve.fallback" should be used instead of "node"';

module.exports.fix = (path) => {
    const valuePath = path.get('value');
    const valueNode = valuePath.node;
    
    path.node.key.name = 'resolve';
    
    for (const prop of valueNode.properties) {
        prop.value = booleanLiteral(false);
    }
    
    replaceWith(valuePath, objectExpression([
        objectProperty(identifier('fallback'), valueNode),
    ]));
};

module.exports.traverse = ({push}) => ({
    'module.exports = __object'(path) {
        const properties = path.get('right.properties');
        
        for (const propPath of properties) {
            const keyPath = propPath.get('key');
            
            if (keyPath.isIdentifier({name: 'node'}))
                push(propPath);
        }
    },
});
