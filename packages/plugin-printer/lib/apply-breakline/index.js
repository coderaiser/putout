'use strict';

const {operator, template} = require('putout');

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
    const newNode = choose(path);
    
    remove(sibling);
    replaceWith(path, newNode);
};

module.exports.filter = (path) => {
    return compareAny(next(path), ['indent()', 'print.indent()', 'write.indent()']);
};

module.exports.include = () => [
    'print.newline()',
    'write.newline()',
];

function choose(path) {
    if (compare(path, 'print.newline()'))
        return template.ast('print.breakline()');
    
    return template.ast('write.breakline()');
}
