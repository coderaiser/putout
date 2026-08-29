import {operator} from 'putout';

const {remove, compare} = operator;

export const report = () => `Use 't.match()' instead of 't.equal()'`;

export const match = () => ({
    'const __a = (__b.match(__c) ?? []).length': (vars, path) => {
        const next = path.getNextSibling();
        return compare(next, 't.equal(__a, __b)');
    },
});

export const replace = () => ({
    'const __a = (__b.match(__c) ?? []).length': (vars, path) => {
        const next = path.getNextSibling();
        
        remove(next);
        
        return `t.match(__b, __c)`;
    },
});
