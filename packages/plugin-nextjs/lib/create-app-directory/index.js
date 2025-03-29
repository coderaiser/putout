import {operator} from 'putout';

const {
    findFile,
    getParentDirectory,
    createDirectory,
} = operator;

export const report = () => `Create 'app' directory`;

export const fix = (filePath) => {
    createDirectory(getParentDirectory(filePath, 'app'), 'app');
};

export const scan = (path, {push}) => {
    const [filePath] = findFile(path, 'package.json');
    const [appPath] = findFile(path, 'app');
    
    if (!filePath || appPath)
        return;
    
    push(filePath);
};
