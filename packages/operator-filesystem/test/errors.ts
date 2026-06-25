import {
    findFile,
    getParentDirectory,
    crawlDirectory,
    getFilename,
    getFileType,
    getFileContent,
    renameFile,
    removeFile,
    removeEmptyDirectory,
    moveFile,
    copyFile,
    createFile,
    readDirectory,
    createDirectory,
    readFileContent,
    writeFileContent,
    createNestedDirectory,
    getRootDirectory,
    getFile,
} from '../lib/filesystem.js';

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
findFile(5, 'hello');

// THROWS Argument of type 'number' is not assignable to parameter of type 'string | string[] | Set<string>'
findFile({} as any, 5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
getParentDirectory(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
crawlDirectory(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
getFilename(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
getFileType(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
getFileContent(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
renameFile(5, 'hello');

// THROWS Expected 2 arguments, but got 1
renameFile({} as any);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
removeFile(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
removeEmptyDirectory(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
moveFile(5, {} as any);

// THROWS Expected 2 arguments, but got 1
moveFile({} as any);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
copyFile(5, {} as any);

// THROWS Expected 2 arguments, but got 1
copyFile({} as any);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
createFile(5, 'hello');

// THROWS Expected 2-3 arguments, but got 1
createFile({} as any);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
readDirectory(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
createDirectory(5, 'hello');

// THROWS Expected 2 arguments, but got 1
createDirectory({} as any);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
readFileContent(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
writeFileContent(5, 'content');

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
createNestedDirectory(5, 'hello');

// THROWS Expected 2 arguments, but got 1
createNestedDirectory({} as any);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
getRootDirectory(5);

// THROWS Argument of type 'number' is not assignable to parameter of type 'NodePath_Final'
getFile(5, 'hello');

// THROWS Expected 2-3 arguments, but got 1
getFile({} as any);

