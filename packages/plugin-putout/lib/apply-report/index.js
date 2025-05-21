import {operator, types} from 'putout';
import toSnakeCase from 'just-snake-case';

const {
    arrayExpression,
    isObjectExpression,
    isStringLiteral,
    isTemplateLiteral,
    stringLiteral,
    isArrayExpression,
} = types;

const {compare} = operator;

const TYPES = {
    noReport: 'noReportWithOptions',
    report: 'noReport',
    noReportWithOptions: 'noReport',
};

export const report = (path) => {
    const {name} = path.node.callee.property;
    
    if (compare(path, 't.noReport(__a, "__b")'))
        return `Use 't.noReport(__a)' instead of 't.noReport(__a, __b)'`;
    
    if (compare(path, 't.noReportWithOptions(__a, __b, __c)'))
        return `Use 't.noReportWithOptions(__a, __c)' instead of 't.noReportWithOptions(__a, __b, __c)'`;
    
    return `Use 't.${TYPES[name]}()' instead of 't.${name}()'`;
};

export const exclude = () => [
    't.noReport(__a, __array)',
];

export const match = () => ({
    't.noReport(__a, __b)': ({__b}) => {
        if (isStringLiteral(__b))
            return true;
        
        if (isTemplateLiteral(__b))
            return true;
        
        return isObjectExpression(__b);
    },
});
export const replace = () => ({
    't.noReport(__a, "__b")': 't.noReport(__a)',
    't.noReport(__a, __b)': ({__b}, path) => {
        if (!isObjectExpression(__b))
            return 't.noReport(__a)';
        
        const {value} = __b.properties[0];
        
        if (isArrayExpression(value))
            return 't.noReportWithOptions(__a, __b)';
        
        const name = toSnakeCase(value.name);
        
        path.node.arguments[1] = arrayExpression([
            arrayExpression([stringLiteral(name), value]),
        ]);
        
        return path;
    },
    't.report(__a)': 't.noReport(__a)',
    't.noReportWithOptions(__a)': 't.noReport(__a)',
    't.noReportWithOptions(__a, __b, __c)': 't.noReportWithOptions(__a, __c)',
});
