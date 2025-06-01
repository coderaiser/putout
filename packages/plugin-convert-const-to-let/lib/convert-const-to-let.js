import {types} from 'putout';

const {
    isBlockStatement,
    isProgram,
} = types;

const {values} = Object;

const isKeyword = (a) => [
    'export',
    'const',
    'let',
    'var',
].includes(a);

const isInsideBlock = ({parentPath}) => isProgram(parentPath) || isBlockStatement(parentPath);

export const report = () => `Use 'let' when reassign`;

export const fix = (path) => {
    path.node.kind = 'let';
};

export const traverse = ({push}) => ({
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
            
            if (!binding.path.isVariableDeclarator())
                continue;
            
            if (isKeyword(binding.path.node.id.name))
                continue;
            
            if (!binding.path.node.init && isInsideBlock(binding.path.parentPath))
                continue;
            
            if (parentPath.node.kind === 'const')
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
