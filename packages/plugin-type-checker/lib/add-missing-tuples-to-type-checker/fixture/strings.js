const isInsideParentLike = callWithParent(createTypeChecker([
    'Program',
    'BlockStatement',
    'ExportNamedDeclaration',
    'LabeledStatement',
]));
