'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWith} = operate;
const {binaryExpression} = types;

module.exports.report = () => 'operator "**" should be used instead of Math.pow';

module.exports.fix = (path) => {
    const [left, right] = path.node.arguments;
    replaceWith(path, binaryExpression('**', left, right));
};

module.exports.include = () => {
    return [
        'Math.pow(__)',
    ];
};

