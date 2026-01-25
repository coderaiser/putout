export const name = 'merge-heading-spaces';
export const report = () => 'Merge heading spaces';

export const fix = (heading) => {
    const newChildren = [];
    
    for (const [i, node] of heading.children.entries()) {
        const nextNode = heading.children[i + 1];
        
        if (bothSpaces(node, nextNode))
            continue;
        
        newChildren.push(node);
    }
    
    heading.children = newChildren;
};

export const traverse = (tree, {push}) => {
    const [heading] = tree.children;
    
    if (heading.type !== 'heading')
        return;
    
    for (const [i, node] of heading.children.entries()) {
        const nextNode = heading.children[i + 1];
        
        if (bothSpaces(node, nextNode)) {
            push(heading);
            break;
        }
    }
};

const bothSpaces = (node, nextNode) => {
    if (!nextNode)
        return false;
    
    if (node.type !== 'text' || node.value !== ' ')
        return false;
    
    return nextNode.type === 'text' && nextNode.value === ' ';
};
