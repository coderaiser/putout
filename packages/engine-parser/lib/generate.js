'use strict';

const generate = require('@babel/generator').default;

module.exports = (node) => {
    return generate(node, {
        comments: false,
        recordAndTupleSyntaxType: 'hash',
    });
};

