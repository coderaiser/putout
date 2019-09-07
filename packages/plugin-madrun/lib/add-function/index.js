'use strict';

const {
    types,
    operate,
} = require('putout');

const {
    replaceWith,
    isModuleExports,
} = operate;

const {
    isLiteral,
    isCallExpression,
    isObjectExpression,
    arrowFunctionExpression,
} = types;

module.exports.report = ({name}) => `function should be used instead of string in script "${name}`;

module.exports.traverse = ({push}) => {
    return {
        AssignmentExpression(path) {
            const {left, right} = path.node;
            
            if (!isModuleExports(left))
                return;
            
            if (!isObjectExpression(right))
                return;
            
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

