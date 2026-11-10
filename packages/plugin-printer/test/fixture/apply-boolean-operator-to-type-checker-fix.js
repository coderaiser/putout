const isNotMarked = createTypeChecker([
    '-: node.async -> -',
    '-: __putout_promises_add_missing_async -> +',
    '+: -> +',
]);
