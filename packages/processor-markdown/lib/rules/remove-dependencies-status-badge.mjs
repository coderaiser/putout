const report = () => 'Remove dependencies status badge';

export default {
    name: 'remove-dependencies-status-badge',
    traverse,
    fix,
    report,
};

function fix(node, tree) {
    const children = tree.children.filter(isDependencyStatus());
    tree.children = children;
    
    const [heading] = children;
    
    if (heading.type !== 'heading')
        return;
    
    const headingChildren = heading.children.filter(isDependencyLink);
    tree.children[0].children = headingChildren;
}

function traverse(tree) {
    const nodes = [];
    tree.children.filter(isDependencyStatus(nodes));
    const [first] = nodes;
    
    if (nodes.length)
        return [first];
}

const isDependencyStatus = (nodes = []) => (child) => {
    if (child.type !== 'definition')
        return true;
    
    if (child.label === 'DependencyStatusURL') {
        nodes.push(child);
        return false;
    }
    
    if (child.label === 'DependencyStatusIMGURL') {
        nodes.push(child);
        return false;
    }
    
    return true;
};

const isDependencyLink = (child) => {
    if (child.type !== 'linkReference')
        return true;
    
    if (child.children[0].label === 'DependencyStatusIMGURL')
        return false;
    
    return true;
};

