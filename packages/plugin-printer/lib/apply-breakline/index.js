'use strict';

const {
    operator,
    template,
} = require('putout');

const {
    compare,
    replaceWith,
    remove,
} = operator;

module.exports.report = () => `breakline = newline + indent`;

const next = (path) => path.parentPath.getNextSibling();

module.exports.fix = (path) => {
    remove(next(path));
    replaceWith(path, template.ast('print.breakline()'));
};

module.exports.filter = (path) => {
    return compare(next(path), 'print.indent()');
};

module.exports.include = () => [
    'print.newline()',
];
