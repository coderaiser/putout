const isSimple = createTypeChecker([
    ['+: node.value -> +'],
    ['+: node.value -> -'],
]);
