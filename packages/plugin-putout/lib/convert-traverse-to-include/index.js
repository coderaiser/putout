'use strict';

const {
    types,
    template,
    operator,
} = require('putout');

const {stringLiteral} = types;
const {compare, remove} = operator;

const isPush = (path) => path.get('value').isIdentifier({
    name: 'push',
});

module.exports.report = () => 'Includer should be used instead of Traverser';

module.exports.match = () => ({
    'module.exports.traverse = __a': (vars, path) => {
        const __aPath = path.get('right.body');
        
        if (__aPath.isBlockStatement())
            return false;
        
        const properties = __aPath.get('properties');
        
        for (const propertyPath of properties) {
            if (!isPush(propertyPath) && !isBlock(propertyPath))
                return false;
        }
        
        return true;
    },
});

module.exports.replace = () => ({
    'module.exports.traverse = __a': (vars, path) => {
        const node = template.ast.fresh('module.exports.include = () => []');
        const __aPath = path.get('right.body');
        const properties = __aPath.get('properties');
        
        for (const propertyPath of properties) {
            const name = getName(propertyPath);
            
            if (isPush(propertyPath) || isBlock(propertyPath)) {
                node.right.body.elements.push(stringLiteral(name));
                remove(propertyPath);
            }
        }
        
        return node;
    },
});

function getName(propertyPath) {
    const keyPath = propertyPath.get('key');
    const {node} = keyPath;
    
    if (keyPath.isIdentifier())
        return node.name;
    
    return node.value;
}

function isBlock(path) {
    const bodyPath = path.get('body');
    
    if (!bodyPath.isBlockStatement() || bodyPath.node.body.length !== 1)
        return false;
    
    const [node] = bodyPath.node.body;
    
    return compare(node, 'push(path)');
}
