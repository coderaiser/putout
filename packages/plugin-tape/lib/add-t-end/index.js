'use strict';

const {
    types,
    template,
    operator,
} = require('putout');
const {compare} = operator;
const {ExpressionStatement} = types;

module.exports.report = () => `'t.end()' is missing at the end of the test`;

module.exports.match = () => ({
    'test(__a, (t) => __body)': match,
    'test(__a, async (t) => __body)': match,
});

module.exports.replace = () => ({
    'test(__a, (t) => __body)': replace,
    'test(__a, async (t) => __body)': replace,
});

function match({__body}) {
    const {body} = __body;
    const {length} = body;
    
    if (!length)
        return true;
    
    for (const element of body) {
        if (compare(element, 't.end()'))
            return false;
    }
    
    return !compare(body[length - 1], 't.end()');
}

function replace({__body}, path) {
    __body.body.push(ExpressionStatement(template.ast('t.end()')));
    return path;
}
