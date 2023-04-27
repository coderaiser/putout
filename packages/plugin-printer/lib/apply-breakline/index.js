'use strict';

const {
    operator,
    template,
} = require('putout');

const {
    compare,
    compareAny,
    replaceWith,
    remove,
} = operator;

module.exports.report = () => `breakline = newline + indent`;

const next = (path) => path.parentPath.getNextSibling();

module.exports.fix = (path) => {
    const sibling = next(path);
    remove(sibling);
    
    if (compare(path, 'print.newline()'))
        return replaceWith(path, template.ast('print.breakline()'));
    
    if (compare(path, 'write.newline()'))
        return replaceWith(path, template.ast('write.breakline()'));
};

module.exports.filter = (path) => {
    return compareAny(next(path), [
        'indent()',
        'print.indent()',
        'write.indent()',
    ]);
};

module.exports.include = () => [
    'print.newline()',
    'write.newline()',
];
