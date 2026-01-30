export const include = () => [
    'import __a from "__b"',
];

export const report = (path) => {
    const [name, source] = getImport(path);
    return `${name} <- ${source}`;
};

export const fix = (path) => {
    const [name, source] = getImport(path);
    
    path.node.leadingComments = [
        CommentLine(`${name} <- ${source}'`),
    ];
};

const CommentLine = (value) => ({
    type: 'CommentLine',
    value: ` ${value}`,
});

const getImport = (path) => {
    const source = path.node.source.value;
    const [first] = path.node.specifiers;
    const {name} = first.local;
    
    return [name, source];
};
