import {types, operator} from 'putout';

const {replaceWith, extract} = operator;
const {
    isLiteral,
    isCallExpression,
    arrowFunctionExpression,
} = types;

export const report = ({name}) => `Use 'function' instead of 'string' in script: '${name}'`;

export const fix = ({path}) => {
    replaceWith(path, arrowFunctionExpression([], path.node));
};

export const traverse = ({push}) => ({
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
});

function traverseProperties({properties, push}) {
    for (const propPath of properties) {
        const {node} = propPath;
        
        if (isLiteral(node.value) || isCallExpression(node.value))
            push({
                name: extract(node.key),
                path: propPath.get('value'),
            });
    }
}
