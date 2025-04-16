export const report = (path) => path.node.source.value;

export const fix = () => {};

export const include = () => [
    'ImportDeclaration',
];

export const filter = (path) => {
    const {value} = path.node.source;
    
    if (!value.startsWith('.'))
        return false;
    
    return !/\.[m|c]?js/.test(value);
};
