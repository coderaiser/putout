'use strict';

const {types, operator} = require('putout');
const {
    compare,
    remove,
    replaceWith,
} = operator;

const {isIdentifier} = types;
const MAX_LENGTH = 20;

const getBody = (path) => {
    const {body} = path.scope.block;
    return body.body || body;
};

module.exports.report = () => `Avoid useless declarations`;

module.exports.match = ({options}) => ({
    'return __a': ({__a}, path) => {
        const binding = path.scope.getAllBindings()[__a.name];
        
        if (!binding)
            return false;
        
        if (binding.referencePaths.length !== 1)
            return false;
        
        if (!binding.path.isVariableDeclarator())
            return false;
        
        if (binding.constantViolations.length)
            return false;
        
        if (!binding.path.get('id').isIdentifier())
            return false;
        
        if (!isTakesOneLine(binding))
            return false;
        
        const next = binding.path.parentPath.getNextSibling();
        const [ref] = binding.referencePaths;
        
        return next === ref.parentPath;
    },
    '__a = __b': ({__a, __b}, path) => {
        if (!isIdentifier(__b))
            return false;
        
        const binding = path.scope.getAllBindings()[__b.name];
        
        if (!binding)
            return false;
        
        if (path.scope.uid !== binding.scope.uid)
            return false;
        
        if (binding.referencePaths.length !== 1)
            return false;
        
        if (binding.constantViolations.length)
            return false;
        
        if (!binding.path.isVariableDeclarator())
            return false;
        
        if (compare(__a, 'module.exports'))
            return false;
        
        if (compare(__a, 'module.exports.__'))
            return false;
        
        for (const node of getBody(path)) {
            if (node === path.parentPath.node)
                continue;
            
            if (node.type !== path.parentPath.type)
                continue;
            
            if (compare(node.expression.left, __a))
                return;
        }
        
        const {
            maxLength = MAX_LENGTH,
        } = options;
        
        if (maxLength < __a.loc?.end.column - __a.loc?.start.column)
            return false;
        
        return binding.path
            .get('id')
            .isIdentifier();
    },
});

module.exports.replace = () => ({
    'return __a': ({__a}, path) => {
        const binding = path.scope.getAllBindings()[__a.name];
        const [ref] = binding.referencePaths;
        
        replaceWith(ref, binding.path.node.init);
        remove(binding.path);
        
        return path;
    },
    '__a = __b': ({__b}, path) => {
        const binding = path.scope.getAllBindings()[__b.name];
        const [ref] = binding.referencePaths;
        
        replaceWith(ref, binding.path.node.init);
        remove(binding.path);
        
        return path;
    },
});

function isTakesOneLine(binding) {
    if (!binding.path.node.init)
        return false;
    
    const {start, end} = binding.path.node.init.loc;
    
    return start.line === end.line;
}
