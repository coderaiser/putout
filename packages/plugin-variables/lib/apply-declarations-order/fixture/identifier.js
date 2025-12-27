const {declarations} = node;

if (parentPath.isExportDeclaration())
    return;

const init = node;
