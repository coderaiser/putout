'use strict';

module.exports.report = () => `Use 'context.sourceCode' instead of 'context.getSourceCode()'`;

module.exports.replace = () => ({
    'context.getSourceCode()': 'context.sourceCode',
});

