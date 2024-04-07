import {operator} from 'putout';

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
