import {
    template,
    types,
    operator,
} from 'putout';

const {replaceWith} = operator;
const {isCallExpression} = types;
const createFn = template('async () => OBJECT');

export const report = () => `Use 'vitest' instead of 'jest'`;

export const replace = () => ({
    'jest.mock(__args)': 'vi.mock(__args)',
    'jest.fn()': 'vi.fn()',
    'jest.requireActual(__a)': (vars, path) => {
        const {parentPath} = path.parentPath;
        
        if (isCallExpression(parentPath.parentPath))
            replaceWith(parentPath, createFn({
                OBJECT: parentPath.node,
            }));
        
        return 'await vi.importActual(__a)';
    },
});
