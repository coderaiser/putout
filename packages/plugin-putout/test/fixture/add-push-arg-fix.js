import {operator} from 'putout';
import {types} from 'putout';

const {file} = types;
const {readFileContent} = operator;
const {getFilename} = operator;

export const scan = (root, {options, trackFile, push}) => {
    const {names = ['same.js']} = options;
    
    for (const file of trackFile(root, names)) {
        const name = getFilename(file);
        const content = readFileContent(file);
        const fixContent = readFixFile(name, file);
        
        push(file, {
            name,
        });
    }
};

module.exports.scan = (root, {push}) => {
    push(file, {
        name,
    });
};
