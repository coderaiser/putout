import {operator} from 'putout';
import {types} from 'putout';

const {readFileContent} = operator;
const {file} = types;
const {getFileContent} = operator;

readFileContent(file);
