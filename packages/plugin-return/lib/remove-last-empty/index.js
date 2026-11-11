import {types, operator} from 'putout';

const {isFunction} = types;
const {createTypeChecker} = operator;

const hasNext = (path) => path.getNextSibling().node;

const isLast = createTypeChecker([
    ['-: parentPath -> !BlockStatement'],
    ['-', hasNext],
    ['+: parentPath.parentPath', isFunction],
]);

export const report = () => `Avoid empty 'return' in function body`;

export const match = () => ({
    return: (vars, path) => isLast(path),
});

export const replace = () => ({
    return: '',
});
