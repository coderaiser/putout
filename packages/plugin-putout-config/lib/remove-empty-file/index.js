import {operator} from 'putout';

const {
    readFileContent,
    removeFile,
} = operator;

export const report = () => `Remove empty '.putout.json'`;

export const fix = (filePath) => {
    removeFile(filePath);
};

export const scan = (path, {push, trackFile}) => {
    for (const file of trackFile(path, '.putout.json')) {
        const data = readFileContent(file);
        
        if (data.startsWith('{}'))
            push(file);
    }
};
