'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWith} = operate;

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
            const {right} = path.node;
            
            if (!isModuleExports(path))
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

function isModuleExports(path) {
    const isModule = path.get('left.object').isIdentifier({
        name: 'module',
    });
    
    const isExports = path.get('left.property').isIdentifier({
        name: 'exports',
    });
    
    return isModule && isExports;
}

