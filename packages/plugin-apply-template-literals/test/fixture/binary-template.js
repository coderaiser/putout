throw new Error(
    'You must pass a scope and parentPath unless traversing a Program/File. ' +
    `Instead of that you tried to traverse a ${parent.type} node without ` +
    'passing scope and parentPath.');
