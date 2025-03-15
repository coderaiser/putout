import {operator} from 'putout';

const {createDirectory} = operator;
const {createNestedDirectory} = operator;
const dirPath = createNestedDirectory(path, '/hello/world');
const dirPath2 = createDirectory(path, 'world');

createNestedDirectory(path, '/world');
createNestedDirectory(path, '/hello/world');
createDirectory(path, 'hello');
