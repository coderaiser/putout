'use strict';

const {
    types,
    template,
    operator,
} = require('putout');

const {compare, traverse} = operator;
const {expressionStatement} = types;

module.exports.report = () => `'t.end()' is missing at the end of the test`;

module.exports.match = () => ({
    'test(__a, (t) => __body)': match,
    'test(__a, async (t) => __body)': match,
});

module.exports.replace = () => ({
    'test(__a, (t) => __body)': replace,
    'test(__a, async (t) => __body)': replace,
});

function match({__body}, path) {
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

function replace({__body}, path) {
    __body.body.push(expressionStatement(template.ast('t.end()')));
    return path;
}
