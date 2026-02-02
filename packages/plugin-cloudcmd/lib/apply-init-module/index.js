import {operator} from 'putout';

const {isESM} = operator;

export const report = () => `Use 'init/show/hide' instead of 'exports'`;

export const match = () => ({
    'CloudCmd.__a = exports': (vars, path) => isESM(path),
    'CloudCmd[__a] = exports': (vars, path) => isESM(path),
});

export const replace = () => ({
    'CloudCmd.__a = exports': `CloudCmd.__a = {
    	init,
        show,
        hide,
    }`,
    'CloudCmd[__a] = exports': `CloudCmd.__a = {
    	init,
        show,
        hide,
    }`,
});
