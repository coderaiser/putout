import {types} from 'putout';
import {applyTryCatch} from '../apply-try-catch.js';

const {
    isCallExpression,
    isMemberExpression,
} = types;

export const report = () => `Use 'tryCatch()' instead of 'try..catch' block`;

export const fix = applyTryCatch('tryCatch');

export const include = () => [
    'TryStatement',
];

export const filter = (path) => {
    const {node} = path;
    const {block, finalizer} = node;
    const {length} = block.body;
    const [first] = block.body;
    
    if (path.parentPath.scope.bindings.error)
        return false;
    
    if (finalizer)
        return false;
    
    if (length !== 1)
        return false;
    
    const {expression} = first;
    
    if (!isCallExpression(expression))
        return false;
    
    return !isMemberExpression(expression.callee);
};
