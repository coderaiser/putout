export const report = () => `Use 'global' instead of 'namespace' in 'declare'`;

export const fix = (path) => {
    path.node.kind = 'global';
};

export const include = () => [
    'TSModuleDeclaration',
];

export const filter = (path) => path.node.kind === 'namespace';
