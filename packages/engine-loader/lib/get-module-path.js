'use strict';

const tryCatch = require('try-catch');

module.exports = (name) => {
    const [, path] = tryCatch(require.resolve, name);
    return path;
};

