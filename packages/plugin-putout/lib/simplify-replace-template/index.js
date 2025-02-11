'use strict';

const {operator} = require('putout');
const {compareAny, replaceWith} = operator;

const parentNodesList = [
    'module.exports.replace = __',
    'export const replace = __',
];

module.exports.report = () => `Simplify replace template`;

module.exports.fix = (path) => {
    const {body} = path.node;
    replaceWith(path, body);
};

module.exports.include = () => [
    '() => "__a"',
];

module.exports.filter = (path) => {
    return path.find(isReplace);
};

function isReplace(path) {
    return compareAny(path, parentNodesList);
}
