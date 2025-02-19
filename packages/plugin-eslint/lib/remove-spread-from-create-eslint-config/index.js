'use strict';

const {types, operator} = require('putout');
const {isSpreadElement} = types;
const {replaceWith} = operator;

module.exports.report = () => `Avoid spread ('...') in 'createEslintConfig'`;

module.exports.fix = (path) => {
    replaceWith(path, path.node.argument);
};

module.exports.traverse = ({push}) => ({
    'createESLintConfig(__array)'(path) {
        for (const argPath of path.get('arguments.0.elements')) {
            if (isSpreadElement(argPath))
                push(argPath);
        }
    },
});
