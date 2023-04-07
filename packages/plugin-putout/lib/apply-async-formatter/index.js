'use strict';

const {
    operator,
    types,
} = require('putout');

const computed = true;
const shorthand = true;

const {
    Identifier,
    ObjectPattern,
    ObjectProperty,
} = types;

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
    const nameId = Identifier(name);
    
    block.async = true;
    
    block.params = [
        ObjectPattern([
            ObjectProperty(nameId, nameId, !computed, shorthand),
        ]),
    ];
    
    if (compare(body[n], 't.end()')) {
        body.pop();
    }
    
    return `await ${name}(__args)`;
};
