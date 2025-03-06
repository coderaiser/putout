'use strict';

const {
    types,
    operator,
    template,
} = require('putout');

const {stringLiteral, objectProperty} = types;
const {
    getProperty,
    replaceWithMultiple,
} = operator;

const fixLintScript = template.ast(`
    () => run('lint', '--fix')
`);

module.exports.report = () => `fix:lint should exist`;

module.exports.fix = (path) => {
    replaceWithMultiple(path, [path.node, objectProperty(stringLiteral('fix:lint'), fixLintScript)]);
};

module.exports.traverse = ({push}) => ({
    'module.exports = __object'(path) {
        const rightPath = path.get('right');
        const lint = getProperty(rightPath, 'lint');
        const fixLint = getProperty(rightPath, 'fix:lint');
        
        if (!lint || fixLint)
            return;
        
        push(lint);
    },
});
