export const beforeIf = createTypeChecker([
    ['-: -> !', isInsideArray],
    ['-: parentPath ->', isCoupleLines],
    ['-: parentPath -> !', is],
    isIdentifierAndIdentifier,
    isStringAndIdentifierInsideOneElementArray,
]);
