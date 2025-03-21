import {operator} from 'putout';

const {compareAny, replaceWith} = operator;

const parentNodesList = [
    'module.exports.replace = __',
    'export const replace = __',
];

export const report = () => `Simplify replace template`;

export const fix = (path) => {
    const {body} = path.node;
    replaceWith(path, body);
};

export const include = () => [
    '() => "__a"',
];

export const filter = (path) => {
    return path.find(isReplace);
};

function isReplace(path) {
    return compareAny(path, parentNodesList);
}
