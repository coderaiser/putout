const report = () => 'Avoid trailing whitespaces';

const fix = (heading, tree) => {
    const latest = heading.children.at(-1);
    
    if (latest.type === 'text' && latest.value === ' ')
        heading.children = heading.children.slice(0, -1);
    
    if (latest.type === 'text' && latest.value.endsWith(' '))
        latest.value = latest.value.slice(0, -1);
    
    tree.children[0].children = heading.children;
};

const traverse = (tree, {push}) => {
    const [heading] = tree.children;
    
    if (heading.type !== 'heading')
        return;
    
    const latest = heading.children.at(-1);
    
    if (latest.type === 'text' && latest.value.endsWith(' '))
        push(heading);
};

export default {
    name: 'remove-trailing-whitespaces-from-heading',
    fix,
    traverse,
    report,
};
