import {
    types,
    template,
    operator,
} from 'putout';

const {compare} = operator;
const {
    expressionStatement,
    isCallExpression,
    isFunction,
} = types;

export const report = () => `'t.end()' is missing at the end of the test`;

export const match = () => ({
    'test(__a, (t) => __body)': check,
    'test(__a, async (t) => __body)': check,
});

export const replace = () => ({
    'test(__a, (t) => __body)': transform,
    'test(__a, async (t) => __body)': transform,
});

function check({__body}) {
    const {body} = __body;
    const {length} = body;
    
    if (!length)
        return true;
    
    const last = body.at(-1);
    
    if (compare(last, 't.end()'))
        return false;
    
    if (compare(last, 'const __a = t.end()'))
        return false;
    
    if (compare(last, 'await t.__(__args)'))
        return false;
    
    const {expression} = last;
    
    if (isCallExpression(expression)) {
        const lastArg = expression.arguments.at(-1);
        return !isFunction(lastArg);
    }
    
    return true;
}

function transform({__body}, path) {
    __body.body.push(expressionStatement(template.ast('t.end()')));
    return path;
}
