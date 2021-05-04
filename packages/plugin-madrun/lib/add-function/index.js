'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;

const {
    isLiteral,
    isCallExpression,
    arrowFunctionExpression,
} = types;

module.exports.report = ({name}) => `function should be used instead of string in script "${name}`;

module.exports.fix = ({path}) => {
    replaceWith(path, arrowFunctionExpression([], path.node));
};

module.exports.traverse = ({push}) => {
    return {
        'export default __object'(path) {
            const properties = path.get('declaration.properties');
            
            traverseProperties({
                properties,
                push,
            });
        },
        'module.exports = __object'(path) {
            const properties = path.get('right.properties');
            
            traverseProperties({
                properties,
                push,
            });
        },
    };
};

function traverseProperties({properties, push}) {
    for (const propPath of properties) {
        const {node} = propPath;
        
        if (isLiteral(node.value) || isCallExpression(node.value)) {
            push({
                name: node.key.value,
                path: propPath.get('value'),
            });
        }
    }
}

