'use strict';

const {operator, types} = require('putout');
const {
    objectProperty,
    objectPattern,
    identifier,
} = types;

const computed = true;
const shorthand = true;

const {compare} = operator;

module.exports.report = () => 'Use Async API to test Formatter';

module.exports.replace = () => ({
    't.format(__args)': create('format'),
    't.noFormat(__args)': create('noFormat'),
    't.formatMany(__args)': create('formatMany'),
});

const create = (name) => (vars, path) => {
    const {block} = path.scope;
    const {body} = block.body;
    const n = body.length - 1;
    const nameId = identifier(name);
    
    block.async = true;
    
    block.params = [
        objectPattern([
            objectProperty(nameId, nameId, !computed, shorthand),
        ]),
    ];
    
    if (compare(body[n], 't.end()'))
        body.pop();
    
    return `await ${name}(__args)`;
};
