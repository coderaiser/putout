'use strict';

const setImportType = (path, type) => {
    path.node.options.properties[0].key.name = type;
};

module.exports.report = () => `Use 'with' instead of 'assert'`;

module.exports.include = () => [
    'ImportDeclaration',
    'import(__a, {assert: {type: "json"}})',
];

module.exports.fix = (path) => {
    if (path.isImportDeclaration()) {
        delete path.node.extra.deprecatedAssertSyntax;
        return;
    }
    
    setImportType(path, 'with');
};

module.exports.filter = (path) => {
    const {extra} = path.node;
    
    if (path.isImportDeclaration())
        return extra?.deprecatedAssertSyntax;
    
    return true;
};
