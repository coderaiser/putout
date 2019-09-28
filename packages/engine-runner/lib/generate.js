'use strict';

const generate = require('@babel/generator').default;
const mem = require('mem');

module.exports = mem((node) => {
    return generate(node, {
        comments: false,
    });
});

