import {operator} from 'putout';

const {getBindingPath} = operator;

export const report = () => `Use 'module.exports' instead of 'exports'`;

export const match = () => ({
    'exports.__a': (vars, path) => {
        const bindingPath = getBindingPath(path, 'exports');
        
        return !bindingPath;
    },
});

export const replace = () => ({
    'exports.__a': 'module.exports.__a',
});
