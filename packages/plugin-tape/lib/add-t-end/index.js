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
    'test(__a, (t) => __body)': ({__body}) => {
        const {body} = __body;
        const {length} = body;
        
        if (!length)
            return true;
        
        return !compare(body[length - 1], 't.end()');
    },
});

module.exports.replace = () => ({
    'test(__a, (t) => __body)': ({__body}, path) => {
        __body.body.push(ExpressionStatement(template.ast('t.end()')));
        return path;
    },
});
