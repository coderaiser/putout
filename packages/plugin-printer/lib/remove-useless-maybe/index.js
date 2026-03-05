import {operator} from 'putout';

const {
    remove,
    getTemplateValues,
    compare,
} = operator;

export const report = () => `Avoid useless 'maybe'`;

export const match = () => ({
    'maybe.indent.__a(!__b)': (vars, path) => {
        const next = path.parentPath.getNextSibling();
        
        if (!compare(next, 'maybe.indent.__a(__b)'))
            return false;
        
        const {__a, __b} = getTemplateValues(next, 'maybe.indent.__a(__b)');
        
        if (!compare(__a, vars.__a))
            return false;
        
        return compare(__b, vars.__b);
    },
    'maybe.print.linebreak(__a)': (vars, path) => {
        const next = path.parentPath.getNextSibling();
        
        if (!compare(next, 'maybe.print.newline(!__a)'))
            return false;
        
        const {__a} = getTemplateValues(next, 'maybe.print.newline(!__a)');
        
        return compare(__a, vars.__a);
    },
});
export const replace = () => ({
    'maybe.indent.__a(!__b)': (vars, path) => {
        const next = path.parentPath.getNextSibling();
        remove(next);
        
        return 'indent.__a()';
    },
    'maybe.print.linebreak(__a)': (vars, path) => {
        const next = path.parentPath.getNextSibling();
        remove(next);
        
        return `{
            maybe.indent(__a);
            print.newline();
        }`;
    },
});
