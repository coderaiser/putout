'use strict';

const generate = require('@babel/generator').default;
const memo = require('micro-memoize');

module.exports = memo((node) => {
    return generate(node, {
        comments: false,
    });
});

