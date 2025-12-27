const [dirPath] = findFile(ast, '/');

moveFile(dirPath, dirPath);

const result = findFile(ast, '/');
