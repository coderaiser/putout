import {
    getParentDirectory,
    getFile,
} from '@putout/operator-filesystem';

export const findFileUp = (file, name) => {
    const parentDirectory = getParentDirectory(file);
    
    if (!parentDirectory)
        return null;
    
    const currentFile = getFile(parentDirectory, name, {
        type: 'file',
    });
    
    if (currentFile)
        return currentFile;
    
    return findFileUp(parentDirectory, name);
};
