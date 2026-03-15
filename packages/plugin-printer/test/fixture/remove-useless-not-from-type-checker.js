export const beforeIf = createTypeChecker([
    ['-: -> !+'],
    ['+: -> !-'],
]);


export const afterIf = is([
    ['-: -> !', isInsideArray],
]);