import {operator} from 'putout';

const {compare} = operator;

export const report = () => `Use 'traverse' instead of 'replace' when using 'fix'`;

export const match = () => ({
    'export const replace = __a': contains('export const fix = __a'),
    'module.exports.replace = __a': contains('module.exports.fix = __a'),
});

export const replace = () => ({
    'export const replace = __a': 'export const traverse = __a',
    'module.exports.replace = __a': 'module.exports.traverse = __a',
});

const contains = (template) => (vars, path) => {
    const {body} = path.scope.getProgramParent().path.node;
    
    for (const current of body) {
        if (compare(current, template))
            return true;
    }
    
    return false;
};
