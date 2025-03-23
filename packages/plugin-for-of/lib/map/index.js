import {types} from 'putout';

const {
    isReturnStatement,
    isBlockStatement,
    isTryStatement,
} = types;

const tail = (body) => body.at(-1);

export const report = () => `Use 'for...of' instead of map when 'return' absent`;

export const match = () => ({
    '__a.map((__b) => __c)': ({__c}, path) => {
        if (!path.parentPath.isExpressionStatement())
            return false;
        
        if (!isBlockStatement(__c))
            return false;
        
        const last = tail(__c.body);
        
        if (isTryStatement(last))
            return false;
        
        return !isReturnStatement(last);
    },
});

export const replace = () => ({
    '__a.map((__b) => __c)': (vars, path) => {
        const a = path.get('callee.object');
        const b = path.get('arguments.0.params.0');
        
        return `for (const ${b} of ${a}) __c`;
    },
});
