const report = () => 'Merge heading spaces';

const fix = (heading) => {
    const newChildren = [];
    const n = heading.children.length;
    
    for (let i = 0; i < n; i++) {
        const node = heading.children[i];
        const nextNode = heading.children[i + 1];
        
        if (bothSpaces(node, nextNode))
            continue;
        
        newChildren.push(node);
    }
    
    heading.children = newChildren;
};

const traverse = (tree, {push}) => {
    const [heading] = tree.children;
    
    if (heading.type !== 'heading')
        return;
    
    const n = heading.children.length;
    
    for (let i = 0; i < n; i++) {
        const node = heading.children[i];
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
    
    if (nextNode.type !== 'text' || nextNode.value !== ' ')
        return false;
    
    return true;
};

export default {
    name: 'merge-heading-spaces',
    fix,
    traverse,
    report,
};
