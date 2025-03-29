import {operator} from 'putout';

const {remove} = operator;

export const report = () => `Use destructuring when using 'stub()' in 'test()'`;

export const match = () => ({
    'const test = require("supertape")': (vars, path) => path.scope.bindings.stub,
});

export const replace = () => ({
    'const test = require("supertape")': (vars, path) => {
        remove(path.scope.bindings.stub.path);
        return 'const {test, stub} = require("supertape")';
    },
});
