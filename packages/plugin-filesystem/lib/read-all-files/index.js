import {operator} from 'putout';

const {readFileContent} = operator;

export const report = () => `Read all files`;

export const fix = (file) => {
    readFileContent(file);
};

export const scan = (root, {push, options, trackFile}) => {
    const {mask = '*'} = options;
    
    for (const file of trackFile(root, mask)) {
        push(file);
    }
};
