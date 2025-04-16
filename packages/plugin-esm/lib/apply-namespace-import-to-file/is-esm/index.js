export const report = (path) => path.type;

export const fix = (path) => {
    path.node.leadingComments = [
        CommentLine('esm'),
    ];
};

export const include = () => [
    'ExportDefaultDeclaration',
    'ExportNamedDeclaration',
    'ImportDeclaration',
];

const CommentLine = (value) => ({
    type: 'CommentLine',
    value: ` ${value}`,
});
