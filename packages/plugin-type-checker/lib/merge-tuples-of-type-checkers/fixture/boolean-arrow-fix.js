const isJSXWithComment = createTypeChecker([
    ['+: node.argument -> !JSXElement'],
    ['-: node.argument.leadingComments -> +'],
]);
