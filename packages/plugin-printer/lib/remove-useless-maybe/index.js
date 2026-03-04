import {operator} from 'putout';

const {
    remove,
    getTemplateValues,
    compare,
} = operator;

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const match = () => ({
    'maybe.print.linebreak(__a)': (vars, path) => {
        const next = path.parentPath.getNextSibling();
        const {expression} = next.node;
        
        if (!compare(expression, 'maybe.print.newline(!__a)'))
            return false;
        
        const {__a} = getTemplateValues(next.node.expression, 'maybe.print.newline(!__a)');
        
        return compare(__a, vars.__a);
    },
});
export const replace = () => ({
    'maybe.print.linebreak(__a)': (vars, path) => {
        const next = path.parentPath.getNextSibling();
        remove(next);
        
        return `{
            maybe.indent(__a);
            print.newline();
        }`;
    },
});
