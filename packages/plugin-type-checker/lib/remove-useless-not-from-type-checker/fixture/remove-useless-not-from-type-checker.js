export const beforeIf = createTypeChecker([
    ['-: -> !+'],
    ['+: -> !-'],
]);


export const afterIf = is([
    ['-: -> !', isInsideArray],
]);

const notCall = '- : path';

notTypeChecker('- : path');
