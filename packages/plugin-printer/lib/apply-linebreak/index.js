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

module.exports.report = () => `linebreak = indent + newline`;

const prev = (path) => path.parentPath.getPrevSibling();

module.exports.fix = (path) => {
    const sibling = prev(path);
    const newNode = choose(path);
    
    remove(sibling);
    replaceWith(path, newNode);
};

module.exports.include = () => [
    'print.newline()',
    'write.newline()',
];

module.exports.filter = (path) => {
    return compareAny(prev(path), ['indent()', 'print.indent()', 'write.indent()']);
};

function choose(path) {
    if (compare(path, 'print.newline()'))
        return template.ast('print.linebreak()');
    
    return template.ast('write.linebreak()');
}
