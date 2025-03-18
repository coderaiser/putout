import {operator} from 'putout';

const {removeEmptyDirectory} = operator;
const {getRootDirectory} = operator;
const {createNestedDirectory} = operator;
const {createDirectory} = operator;
const {readDirectory} = operator;
const {renameFiles} = operator;
const {getFileType} = operator;
const {copyFile} = operator;
const {createFile} = operator;
const {getFilename} = operator;
const filename = getFilename(filePath);

createFile(dirPath, 'hello');
copyFile(filePath, dirPath);
getFileType();
renameFiles();
readDirectory();
createDirectory();
createNestedDirectory();
getRootDirectory();
removeEmptyDirectory(dirPath);
