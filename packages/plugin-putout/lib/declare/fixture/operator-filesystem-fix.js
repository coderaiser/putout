import {operator} from 'putout';

const {getFileType} = operator;
const {copyFile} = operator;
const {getFilename} = operator;
const filename = getFilename(filePath);

copyFile(filePath, dirPath);
getFileType();
