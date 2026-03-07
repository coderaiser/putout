const isNextStatementWithBlockComment = createTypeChecker([
    '+: node.trailingComments.0 -> CommentBlock',
]);
