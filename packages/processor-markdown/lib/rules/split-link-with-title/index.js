export const name = 'split-link-with-title';

export const report = () => 'Split link with title';

export const fix = (node) => {
    const [url, title] = node.url.split('"');
    
    node.url = url;
    node.title = title;
};

export const traverse = (tree, {push}) => {
    for (const node of tree.children) {
        const {
            type,
            url,
            title,
        } = node;
        
        if (type === 'paragraph')
            traverse(node, {
                push,
            });
        
        if (!/link|definition/.test(type))
            continue;
        
        if (title || !url.includes('"'))
            continue;
        
        push(node);
    }
};
