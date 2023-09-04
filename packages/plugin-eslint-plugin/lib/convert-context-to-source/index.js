'use strict';

module.exports.report = () => `Use 'source' instead of 'context'`;

module.exports.replace = () => ({
    'context.parserServices': 'sourceCode.parserServices',
    'context.getAncestors': 'sourceCode.getAncestors',
    'context.getCwd()': 'context.cwd',
    'context.getScope()': 'sourceCode.getScope()',
    'context.getDeclaredVariables(__a)': 'sourceCode.getDeclaredVariables(__a)',
    'context.markVariableAsUsed(__a)': 'sourceCode.markVariableAsUsed(__a)',
    'context.getPhysicalFilename()': 'context.physicalFilename',
});
