import {
    isDisjunction,
    isParentDisjunction,
} from '../types.js';

export const report = () => 'Remove useless group';

export const fix = ({path, node}) => {
    path.replace(node.expression);
};

export const traverse = ({push}) => ({
    Group(path) {
        const {type} = path.parent;
        
        if (!/RegExp|Alternative/.test(type))
            return;
        
        const nextNode = getNextSibling(path);
        
        if (nextNode?.type === 'Repetition')
            return;
        
        const {node} = path;
        
        if (node.name)
            return;
        
        if (!node.expression)
            return;
        
        if (isParentDisjunction(path))
            return;
        
        if (isDisjunction(node.expression))
            return;
        
        push({
            path,
            node,
        });
    },
});

function getNextSibling(path) {
    let found = false;
    const {expressions = []} = path.parent;
    
    for (const current of expressions) {
        if (found)
            return current;
        
        if (current === path.node)
            found = true;
    }
    
    return null;
}
