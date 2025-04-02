const setImportType = (path, type) => {
    path.node.options.properties[0].key.name = type;
};

export const report = () => `Use 'with' instead of 'assert'`;

export const include = () => [
    'ImportDeclaration',
    'import(__a, {assert: {type: "json"}})',
];

export const fix = (path) => {
    if (path.isImportDeclaration()) {
        delete path.node.extra.deprecatedAssertSyntax;
        return;
    }
    
    setImportType(path, 'with');
};

export const filter = (path) => {
    const {extra} = path.node;
    
    if (path.isImportDeclaration())
        return extra?.deprecatedAssertSyntax;
    
    return true;
};
