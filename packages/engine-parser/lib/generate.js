'use strict';

const generate = require('@babel/generator').default;

module.exports = (node, options, sourceMaps) => {
    return generate(node, {
        comments: false,
        recordAndTupleSyntaxType: 'hash',
        ...options,
    }, sourceMaps);
};
