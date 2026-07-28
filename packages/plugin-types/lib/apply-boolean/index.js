import {operator} from 'putout';

const {removeParens} = operator;

export const report = () => `Use 'Boolean' instead of '!!'`;

export const replace = () => ({
    '!!__a': (vars, path) => {
        const __aPath = path.get('argument.argument');
        removeParens(__aPath);
        
        return 'Boolean(__a)';
    },
});
