import {lintRule} from 'unified-lint-rule';

export const removeDependenciesStatusBadge = lintRule('remark-lint:remove-dependencies-status-badge', (tree, file) => {
    const children = tree.children.filter(isDependencyStatus(file));
    tree.children = children;
    
    const [heading] = children;
    
    if (heading.type !== 'heading')
        return;
    
    let headingChildren = heading.children.filter(isDependencyLink(file));
    const latest = headingChildren[headingChildren.length - 1];
    
    if (latest.type === 'text' && latest.value === ' ')
        headingChildren = headingChildren.slice(0, -1);
    
    if (latest.type === 'text' && / $/.test(latest.value))
        latest.value = latest.value.slice(0, -1);
    
    tree.children[0].children = headingChildren;
});

const isDependencyStatus = (file) => (child) => {
    if (child.type !== 'definition')
        return true;
    
    if (child.label === 'DependencyStatusURL') {
        file.message('Remove DependencyStatusURL', child);
        return false;
    }
    
    if (child.label === 'DependencyStatusIMGURL') {
        file.message('Remove DependencyStatusIMGURL', child);
        return false;
    }
    
    return true;
};

const isDependencyLink = (file) => (child) => {
    if (child.type !== 'linkReference')
        return true;
    
    if (child.children[0].label === 'DependencyStatusIMGURL') {
        file.message('Remove reference to DependencyStatusIMGURL', child);
        return false;
    }
    
    return true;
};
