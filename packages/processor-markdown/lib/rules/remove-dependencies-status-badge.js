const report = () => 'Remove dependencies status badge';

const noop = () => {};

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

function traverse(tree, {push}) {
    tree.children.filter(isDependencyStatus(push));
}

const isDependencyStatus = (push = noop) => (child) => {
    if (child.type !== 'definition')
        return true;
    
    if (child.label === 'DependencyStatusURL') {
        push(child);
        return false;
    }
    
    return child.label !== 'DependencyStatusIMGURL';
};

const isDependencyLink = (child) => {
    if (child.type !== 'linkReference')
        return true;
    
    return child.children[0].label !== 'DependencyStatusIMGURL';
};
