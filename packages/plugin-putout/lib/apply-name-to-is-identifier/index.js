export const report = (path) => {
    const {value} = path.get('arguments.1').node;
    return `Use \`{name: '${value}'}\` instead of '${value}'`;
};

export const replace = () => ({
    'isIdentifier(__a, "__b")': 'isIdentifier(__a, {name: "__b"})',
});
