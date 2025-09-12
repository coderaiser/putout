import {operator} from 'putout';

const {traverse} = operator;

export const report = () => `Use 'push(__a)' instead of 'push({path: __a})'`;

export const match = () => ({
    'export const fix = ({path}) => __a': (vars, {parentPath}) => {
        let is = false;
        
        traverse(parentPath, {
            'push({path: __a})': () => {
                is = true;
            },
        });
        
        return is;
    },
});

export const replace = () => ({
    'push({path: __a})': 'push(__a)',
    'export const fix = ({path}) => __a': 'export const fix = (path) => __a',
});
