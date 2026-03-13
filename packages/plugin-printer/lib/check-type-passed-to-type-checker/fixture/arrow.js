const isSimple = createTypeChecker([
    ['+: node.value -> !', hasResult],
]);
