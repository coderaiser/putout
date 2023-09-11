'use strict';

module.exports.report = () => `Use 'source' instead of 'context'`;

module.exports.replace = () => ({
    'context.getSourceCode()': 'context.sourceCode',
    'context.parserServices': 'sourceCode.parserServices',
    'context.getAncestors': 'sourceCode.getAncestors',
    'context.getCwd()': 'context.cwd',
    'context.getScope()': 'sourceCode.getScope()',
    'context.getDeclaredVariables(__a)': 'sourceCode.getDeclaredVariables(__a)',
    'context.markVariableAsUsed(__a)': 'sourceCode.markVariableAsUsed(__a)',
    'context.getFilename()': 'context.filename',
    'context.getPhysicalFilename()': 'context.physicalFilename',
    'context.getNodeByRangeIndex(__args)': 'sourceCode.getNodeByRangeIndex(__args)',
});
