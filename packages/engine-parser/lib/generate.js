'use strict';

const {generate} = require('@putout/babel');

module.exports = (node, options, sourceMaps) => {
    return generate(node, {
        comments: false,
        ...options,
    }, sourceMaps);
};
