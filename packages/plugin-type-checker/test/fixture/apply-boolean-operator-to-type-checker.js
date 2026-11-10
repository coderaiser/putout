const isNotMarked = createTypeChecker([
    ['-: node.async', not(Boolean)],
    ['-: __putout_promises_add_missing_async', Boolean],
    ['+', Boolean],
]);
