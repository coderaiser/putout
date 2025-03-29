import {operator} from 'putout';

const {
    findFile,
    moveFile,
    renameFile,
} = operator;

export const report = () => `Rename 'pages/404.js' to 'not-found.js'`;

export const fix = (filePath, {dirPath}) => {
    renameFile(filePath, 'not-found.js');
    moveFile(filePath, dirPath);
};

export const scan = (path, {push}) => {
    const [filePath] = findFile(path, '404.js');
    const [dirPath] = findFile(path, 'app');
    
    if (!filePath || !dirPath)
        return;
    
    push(filePath, {
        dirPath,
    });
};
