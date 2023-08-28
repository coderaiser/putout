export const report = () => `Suffix "legacy" should be avoided`;

export const fix = (path) => {
    const [nameNode] = path.node.arguments;
    
    nameNode.value = nameNode.value.replace('/legacy', '');
    nameNode.raw = nameNode.raw.replace('/legacy', '');
};

export const include = () => [
    'require("__")',
];

export const filter = (path) => {
    const [nameNode] = path.node.arguments;
    return nameNode.value.includes('/legacy');
};
