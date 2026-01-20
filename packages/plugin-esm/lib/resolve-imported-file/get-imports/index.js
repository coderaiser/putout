export const report = (path) => path.node.source.value;

export const fix = () => {};

export const include = () => [
    'ImportDeclaration',
    'import("__a")',
];

export const filter = (path) => {
    const {source} = path.node;
    const {value} = source;
    
    if (!value.startsWith('.'))
        return false;
    
    return !/\.[mc]?js/.test(value);
};
