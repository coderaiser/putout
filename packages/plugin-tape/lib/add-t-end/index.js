import {
    types,
    template,
    operator,
} from 'putout';

const {compare, traverse} = operator;
const {expressionStatement} = types;

export const report = () => `'t.end()' is missing at the end of the test`;

export const match = () => ({
    'test(__a, (t) => __body)': check,
    'test(__a, async (t) => __body)': check,
});

export const replace = () => ({
    'test(__a, (t) => __body)': transform,
    'test(__a, async (t) => __body)': transform,
});

function check({__body}, path) {
    const {body} = __body;
    const {length} = body;
    
    if (!length)
        return true;
    
    for (const element of body) {
        if (compare(element, 't.end()'))
            return false;
    }
    
    let found = false;
    
    traverse(path, {
        'await t.__(__args)': () => {
            found = true;
            path.stop();
        },
        't.end()': (path) => {
            found = true;
            path.stop();
        },
    });
    
    return !found;
}

function transform({__body}, path) {
    __body.body.push(expressionStatement(template.ast('t.end()')));
    return path;
}
