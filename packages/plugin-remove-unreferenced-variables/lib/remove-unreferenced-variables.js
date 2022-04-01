'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Unreferenced variables should be avoided`;

module.exports.fix = (path) => remove(path);

module.exports.traverse = ({push}) => ({
    '__identifier = __a'(path) {
        const {name} = path.node.left;
        const binding = path.scope.bindings[name];
        
        if (!binding)
            return;
        
        const {referenced} = binding;
        
        if (referenced)
            return;
        
        if (binding.path.isObjectPattern()) {
            const propPath = getPropertyPath(binding.path, name);
            
            push(path);
            push(propPath);
            
            return;
        }
        
        const idPath = binding.path.get('id');
        
        if (binding.path.isVariableDeclarator() && idPath.isObjectPattern()) {
            const propPath = getPropertyPath(idPath, name);
            
            push(path);
            push(propPath);
            
            return;
        }
        
        push(path);
        push(binding.path);
    },
});

function getPropertyPath(path, name) {
    let propPath;
    
    for (propPath of path.get('properties')) {
        const {
            key,
            shorthand,
        } = propPath.node;
        
        if (shorthand && key.name !== name)
            continue;
        
        break;
    }
    
    return propPath;
}

