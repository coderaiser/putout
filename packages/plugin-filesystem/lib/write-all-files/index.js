import {operator} from 'putout';

const {
    writeFileContent,
    readFileContent,
} = operator;

export const report = () => `Write all files`;

export const fix = (file) => {
    const content = readFileContent(file);
    writeFileContent(file, content);
};

export const scan = (root, {push, trackFile}) => {
    for (const file of trackFile(root, ['*'])) {
        push(file);
    }
};
