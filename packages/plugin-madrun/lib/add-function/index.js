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

module.exports.traverse = ({push}) => {
    return {
        'module.exports = __object'(path) {
            const propertiesPaths = path.get('right.properties');
            
            for (const propPath of propertiesPaths) {
                const {node} = propPath;
                
                if (isLiteral(node.value) || isCallExpression(node.value)) {
                    push({
                        name: node.key.value,
                        path: propPath.get('value'),
                    });
                }
            }
        },
    };
};

module.exports.fix = ({path}) => {
    replaceWith(path, arrowFunctionExpression([], path.node));
};

