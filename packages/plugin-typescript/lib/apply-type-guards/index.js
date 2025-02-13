'use strict';

const {
    types,
    operator,
    template,
} = require('putout');

const {replaceWith} = operator;
const {Identifier} = types;

const create = template('(__a): __a is __c => typeof __a === "__b"', {
    placeholderPattern: /__/,
});

module.exports.report = () => `Use 'type guards'`;

module.exports.match = () => ({
    '(__a) => typeof __a === "__b"': (vars, path) => !path.node.returnType,
});

module.exports.replace = () => ({
    '(__a) => typeof __a === "__b"': ({__a, __b}, path) => {
        replaceWith(path, create({
            __a,
            __b,
            __c: Identifier(__b.value),
        }));
        
        return path;
    },
});
