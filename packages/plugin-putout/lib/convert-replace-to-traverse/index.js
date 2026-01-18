import {operator} from 'putout';

const {compare} = operator;

export const report = () => `Use 'traverse' instead of 'replace' when using 'fix'`;

export const match = () => ({
    'export const replace = __a': (vars, path) => {
        const {body} = path.scope.getProgramParent().path.node;
        
        for (const current of body) {
            if (compare(current, 'export const fix = __a'))
                return true;
        }
        
        return false;
    },
});

export const replace = () => ({
    'export const replace = __a': 'export const traverse = __a',
});
