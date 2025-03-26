import {types} from 'putout';
import {applyTryCatch} from '../apply-try-catch.js';

const {isAwaitExpression} = types;

export const report = () => `Use 'await tryToCatch()' instead of 'await' in 'try-catch' block`;

export const fix = applyTryCatch('tryToCatch');

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
    
    return isAwaitExpression(first.expression);
};
