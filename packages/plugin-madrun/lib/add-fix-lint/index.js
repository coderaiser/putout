'use strict';

const {
    types,
    operator,
    template,
} = require('putout');

const {
    findProperty,
    replaceWithMultiple,
} = operator;

const {
    ObjectProperty,
    StringLiteral,
} = types;

const fixLintScript = template.ast(`
    () => run('lint', '--fix')
`);

module.exports.report = () => `fix:lint should exist`;

module.exports.fix = (path) => {
    replaceWithMultiple(path, [
        path.node,
        ObjectProperty(StringLiteral('fix:lint'), fixLintScript),
    ]);
};

module.exports.traverse = ({push}) => ({
    'module.exports = __object'(path) {
        const rightPath = path.get('right');
        const lint = findProperty(rightPath, 'lint');
        const fixLint = findProperty(rightPath, 'fix:lint');
        
        if (!lint || fixLint)
            return;
        
        push(lint);
    },
});

