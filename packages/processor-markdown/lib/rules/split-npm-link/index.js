export const name = 'split-npm-link';

export const report = () => 'Split npm link';

export const fix = (node) => {
    const {url} = node;
    
    node.url = url.replace('"npm"', '');
    node.title = 'npm';
};

export const traverse = (tree, {push}) => {
    for (const node of tree.children) {
        const {
            type,
            identifier,
            url,
            title,
        } = node;
        
        if (type !== 'definition')
            continue;
        
        if (identifier !== 'npmurl')
            continue;
        
        if (title || !url.includes('"npm"'))
            break;
        
        push(node);
        break;
    }
};
