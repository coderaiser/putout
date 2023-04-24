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

module.exports.report = () => `linebreak = indent + newline`;

const prev = (path) => path.parentPath.getPrevSibling();

module.exports.fix = (path) => {
    remove(prev(path));
    replaceWith(path, template.ast('print.linebreak()'));
};

module.exports.include = () => [
    'print.newline()',
];

module.exports.filter = (path) => {
    return compare(prev(path), 'print.indent()');
};
