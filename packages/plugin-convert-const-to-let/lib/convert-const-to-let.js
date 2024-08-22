'use strict';

const {values} = Object;

module.exports.report = () => `Use 'let' when reassign`;

module.exports.fix = (path) => {
    path.node.kind = 'let';
};

module.exports.traverse = ({push}) => ({
    VariableDeclaration: (path) => {
        if (path.parentPath.isTSModuleBlock())
            return;
        
        const {scope} = path;
        const {declare} = path.node;
        
        if (declare)
            return;
        
        for (const binding of values(scope.bindings)) {
            const {parentPath, node} = binding.path;
            const {init} = node;
            
            if (init && binding.constant)
                continue;
            
            if (isLoop(parentPath) && binding.constant)
                continue;
            
            if (!parentPath.node)
                continue;
            
            if (binding.path.isVariableDeclarator() && parentPath.node.kind === 'const')
                push(binding.path.parentPath);
        }
    },
});

const isLoop = ({parentPath}) => {
    if (!parentPath)
        return false;
    
    if (parentPath.isForOfStatement())
        return true;
    
    return parentPath.isForInStatement();
};
