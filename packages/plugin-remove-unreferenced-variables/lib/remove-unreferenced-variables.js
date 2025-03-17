'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => 'Avoid unreferenced variables';

module.exports.fix = (path) => remove(path);

module.exports.traverse = ({push}) => ({
    'return __a'(path) {
        const arg = path.get('argument');
        
        if (!arg.isIdentifier())
            return false;
        
        const binding = path.scope.bindings[arg.node.name];
        
        if (!binding)
            return false;
        
        if (binding.constantViolations.length)
            return false;
        
        if (binding.referencePaths.length !== 1)
            return false;
        
        if (!binding.path.isVariableDeclarator())
            return false;
        
        if (binding.path.node.init)
            return false;
        
        push(path);
    },
    '__identifier = __a'(path) {
        const {parentPath} = path;
        
        if (parentPath.isMemberExpression())
            return;
        
        if (parentPath.isConditionalExpression())
            return;
        
        const {name} = path.node.left;
        const binding = path.scope.getAllBindings()[name];
        
        if (!binding)
            return;
        
        if (path.find(isInsideForOf))
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
        const {key, shorthand} = propPath.node;
        
        if (shorthand && key.name !== name)
            continue;
        
        break;
    }
    
    return propPath;
}

const isInsideForOf = (path) => path.__putout_for_of_reduce;
