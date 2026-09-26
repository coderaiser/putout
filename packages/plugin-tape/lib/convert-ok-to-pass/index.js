import {types} from 'putout';

const {isVariableDeclarator} = types;

export const report = () => `Use 't.pass()' instead of 't.ok()'`;

export const match = () => ({
    't.ok(true)': (vars, path) => !path.find(isVariableDeclarator),
});

export const replace = () => ({
    't.ok(true)': 't.pass()',
});
