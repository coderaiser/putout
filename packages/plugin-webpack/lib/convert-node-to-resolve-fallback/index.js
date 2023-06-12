'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;

const {
    ObjectExpression,
    ObjectProperty,
    Identifier,
    BooleanLiteral,
} = types;

module.exports.report = () => '"resolve.fallback" should be used instead of "node"';

module.exports.fix = (path) => {
    const valuePath = path.get('value');
    const valueNode = valuePath.node;
    
    path.node.key.name = 'resolve';
    
    for (const prop of valueNode.properties) {
        prop.value = BooleanLiteral(false);
    }
    
    replaceWith(valuePath, ObjectExpression([
        ObjectProperty(Identifier('fallback'), valueNode),
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
