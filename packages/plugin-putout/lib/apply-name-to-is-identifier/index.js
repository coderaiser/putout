export const report = (path) => {
    const [first, second] = path.get('arguments');
    
    if (second) {
        const {value} = second.node;
        return `Use \`{name: '${value}'}\` instead of '${value}'`;
    }
    
    const {value} = first.node;
    
    return `Use \`{name: '${value}'}\` instead of '${value}'`;
};

export const replace = () => ({
    'isIdentifier(__a, "__b")': 'isIdentifier(__a, {name: "__b"})',
    '__a.isIdentifier("__b")': '__a.isIdentifier({name: "__b"})',
});
