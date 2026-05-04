export const report = (path) => path.node.source.value;

export const fix = () => {};

export const include = () => [
    'ImportDeclaration',
    'import("__a")',
    'export __exports from "__a"',
    'export * from "__a"',
];

export const filter = (path) => {
    const {value} = path.node.source;
    
    if (!value.startsWith('.'))
        return false;
    
    return /\.[mc]?js/.test(value);
};
