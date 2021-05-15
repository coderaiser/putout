'use strict';

const {
    types,
    operator,
    template,
} = require('putout');

const getProperty = require('../get-property');

const {replaceWithMultiple} = operator;

const {
    ObjectProperty,
    StringLiteral,
} = types;

const freshLintScript = template.ast(`
    () => run('lint', '--fresh')
`);

module.exports.report = () => `fresh:lint should exist`;

module.exports.fix = (path) => {
    replaceWithMultiple(path, [
        path.node,
        ObjectProperty(StringLiteral('fresh:lint'), freshLintScript),
        ObjectProperty(StringLiteral('lint:fresh'), freshLintScript),
    ]);
};

module.exports.traverse = ({push}) => ({
    'export default  __object': pushLint('declaration', push),
    'module.exports = __object': pushLint('right', push),
});

const pushLint = (selector, push) => (path) => {
    const currentPath = path.get(selector);
    const lint = getProperty(currentPath, 'lint');
    const freshLint = getProperty(currentPath, 'fresh:lint');
    
    if (!lint || freshLint)
        return;
    
    push(lint);
};
