'use strict';

const {
    types,
    template,
    operator,
} = require('putout');
const {StringLiteral} = types;
const {compare} = operator;

const isPush = (path) => path.get('value').isIdentifier({
    name: 'push',
});

module.exports.report = () => 'Includer should be used instead of Traverser';

module.exports.match = () => ({
    'module.exports.traverse = __a': (vars, path) => {
        const __aPath = path.get('right.body');
        
        if (__aPath.isBlockStatement())
            return false;
        
        for (const propertyPath of __aPath.get('properties')) {
            if (isPush(propertyPath) || isBlock(propertyPath)) {
                return true;
            }
        }
        
        return false;
    },
});

module.exports.replace = () => ({
    'module.exports.traverse = __a': (vars, path) => {
        const node = template.ast.fresh('module.exports.include = () => []');
        const __aPath = path.get('right.body');
        
        for (const propertyPath of __aPath.get('properties')) {
            const name = getName(propertyPath);
            
            if (isPush(propertyPath) || isBlock(propertyPath)) {
                node.right.body.elements.push(StringLiteral(name));
                propertyPath.remove();
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

