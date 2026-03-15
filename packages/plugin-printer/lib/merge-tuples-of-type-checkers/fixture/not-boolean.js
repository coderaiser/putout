export const is = createTypeChecker([
    ['-: node.consequent.length -> !', Boolean],
    ['+: -> !', Boolean],
]);

