'use strict';

module.exports.rules = {
    'apply-async-formatter': applyAsyncFormatter,
    'apply-processors-destructuring': applyProcessorsDestructuring,
};

const applyAsyncFormatter = require('./apply-async-formatter');
const applyProcessorsDestructuring = require('./apply-processors-destructuring');
