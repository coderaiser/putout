import {operator} from 'putout';

const {copyFile} = operator;
const {getFilename} = operator;
const filename = getFilename(filePath);

copyFile(filePath, dirPath);
