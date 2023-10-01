'use strict';

module.exports.report = () => `Use 'source' instead of 'context'`;

module.exports.replace = () => ({
    'context.getSourceCode()': 'context.sourceCode',
    
    'context.getAncestors': 'sourceCode.getAncestors',
    'context.getCwd()': 'context.cwd',
    'context.getScope()': 'sourceCode.getScope()',
    'context.getDeclaredVariables(__a)': 'sourceCode.getDeclaredVariables(__a)',
    'context.markVariableAsUsed(__a)': 'sourceCode.markVariableAsUsed(__a)',
    'context.getFilename()': 'context.filename',
    'context.getPhysicalFilename()': 'context.physicalFilename',
    'context.getNodeByRangeIndex(__args)': 'sourceCode.getNodeByRangeIndex(__args)',
    
    'context.getSource()': 'sourceCode.getText()',
    'context.getSourceLines()': 'sourceCode.getLines()',
    'context.getAllComments()': 'sourceCode.getAllComments()',
    'context.getComments()': 'sourceCode.getComments()',
    'context.getCommentsBefore()': 'sourceCode.getCommentsBefore()',
    'context.getCommentsAfter()': 'sourceCode.getCommentsAfter()',
    'context.getCommentsInside()': 'sourceCode.getCommentsInside()',
    'context.getJSDocComment()': 'sourceCode.getJSDocComment()',
    'context.getFirstToken()': 'sourceCode.getFirstToken()',
    'context.getFirstTokens()': 'sourceCode.getFirstTokens()',
    'context.getLastToken()': 'sourceCode.getLastToken()',
    'context.getLastTokens()': 'sourceCode.getLastTokens()',
    'context.getTokenAfter()': 'sourceCode.getTokenAfter()',
    'context.getTokenBefore()': 'sourceCode.getTokenBefore()',
    'context.getTokenByRangeStart()': 'sourceCode.getTokenByRangeStart()',
    'context.getTokens()': 'sourceCode.getTokens()',
    'context.getTokensAfter()': 'sourceCode.getTokensAfter()',
    'context.getTokensBefore()': 'sourceCode.getTokensBefore()',
    'context.getTokensBetween()': 'sourceCode.getTokensBetween()',
    'context.parserServices': 'sourceCode.parserServices',
});
