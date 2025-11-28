import {types} from 'putout';

const {isExpressionStatement} = types;

export const report = () => 'Use object destructuring';

export const match = () => ({
    '__a = __b.__a': (vars, {parentPath}) => isExpressionStatement(parentPath),
});

export const replace = () => ({
    'const __a = __b.__a': 'const {__a} = __b',
    'let __a = __b.__a': 'let {__a} = __b',
    '__a = __b.__a': '({__a} = __b)',
});
