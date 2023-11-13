import {
    operator,
    types,
} from 'putout';

const {assign} = Object;
const {isIdentifier} = types;
const {remove, replaceWith} = operator;

export const report = () => `Expand bindings`;

export const fix = ({path, ref, parentPath}) => {
    const bindingInit = path.get('init');
    
    if (bindingInit.isArrowFunctionExpression())
        assign(bindingInit.node, {
            extra: {
                parenthesized: true,
            },
        });
    
    if (parentPath.isVariableDeclarator()) {
        const refInit = ref.parentPath.get('init');
        
        replaceWith(refInit, bindingInit);
        remove(path);
        
        return;
    }
    
    if (parentPath.isCallExpression()) {
        replaceWith(ref, bindingInit);
        remove(path);
        
        return;
    }
};

export const traverse = ({push}) => ({
    ReferencedIdentifier(path) {
        const {name} = path.node;
        const binding = path.scope.bindings[name];
        
        if (!binding)
            return;
        
        if (binding.referencePaths.length !== 1)
            return;
        
        const [ref] = binding.referencePaths;
        const {parentPath} = ref;
        
        if (!binding.path.isVariableDeclarator())
            return;
        
        if (!binding.path.node.init)
            return;
        
        if (!isIdentifier(binding.path.node.id))
            return;
        
        push({
            path: binding.path,
            parentPath,
            ref,
        });
    },
});
