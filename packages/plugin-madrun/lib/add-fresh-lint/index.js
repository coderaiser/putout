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

module.exports.traverse = ({push}) => {
    return {
        'module.exports = __object'(path) {
            const rightPath = path.get('right');
            
            const lint = getProperty(rightPath, 'lint');
            const freshLint = getProperty(rightPath, 'fresh:lint');
            
            if (!lint || freshLint)
                return;
            
            push(lint);
        },
    };
};

