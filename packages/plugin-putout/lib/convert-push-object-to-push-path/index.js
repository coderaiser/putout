import {operator} from 'putout';

const {traverse} = operator;

export const report = () => `Use 'push(__a)' instead of 'push({path: __a})'`;

export const match = () => ({
    'push({path})': (vars, path) => {
        let is = false;
        const programPath = path.scope.getProgramParent().path;
        
        traverse(programPath, {
            'export const fix = (path) => __body': () => {
                is = true;
            },
        });
        
        return is;
    },
    'export const fix = ({path}) => __a': (vars, {parentPath}) => {
        let is = false;
        
        traverse(parentPath, {
            'push({path: __a})': () => {
                is = true;
            },
            'push({path})': () => {
                is = true;
            },
        });
        
        return is;
    },
});

export const replace = () => ({
    'push({path: __a})': 'push(__a)',
    'push({path})': 'push(path)',
    'export const fix = ({path}) => __a': 'export const fix = (path) => __a',
});
