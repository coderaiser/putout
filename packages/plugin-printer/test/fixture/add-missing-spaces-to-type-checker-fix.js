export const beforeIf = createTypeChecker([
    ['-: -> !', isInsideArray],
    ['-: parentPath ->', isCoupleLines],
    ['+:', isIdentifierAndIdentifier],
    ['+:', isStringAndIdentifierInsideOneElementArray],
]);
