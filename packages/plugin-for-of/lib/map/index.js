import {types, operator} from 'putout';

const {compare} = operator;

const {
    isReturnStatement,
    isBlockStatement,
    isTryStatement,
    isArrayPattern,
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
    'const __a = __b.map((__c) => __d)': ({__a, __c, __d}) => {
        if (isBlockStatement(__d))
            return false;
        
        if (compare(__c, __d))
            return false;
        
        return !isArrayPattern(__a);
    },
});

export const replace = () => ({
    '__a.map((__b) => __c)': (vars, path) => {
        const a = path.get('callee.object');
        const b = path.get('arguments.0.params.0');
        
        return `for (const ${b} of ${a}) __c`;
    },
    'const __a = __b.map((__c) => __d)': `{
        const __a = [];
        for (const __c of __b) {
            __a.push(__d);
        }
    }`,
    '__a = __b.map((__c) => __d)': `{
        __a = [];
        for (const __c of __b) {
            __a.push(__d);
        }
    }`,
});
