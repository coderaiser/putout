const {declarations} = node;

if (parentPath.isExportDeclaration())
    return;

const init = node;

const fn = stub();
const x = stub();
