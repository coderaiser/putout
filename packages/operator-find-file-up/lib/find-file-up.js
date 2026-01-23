import {
    getFilename,
    getParentDirectory,
    getFile,
} from '@putout/operator-filesystem';

export const findFileUp = (file, name) => {
    const parentDirectory = getParentDirectory(file);
    
    if (!parentDirectory)
        return [];
    
    const directoryName = getFilename(parentDirectory);
    
    const currentFile = getFile(parentDirectory, name, {
        type: 'file',
    });
    
    if (currentFile)
        return [directoryName, currentFile];
    
    return findFileUp(parentDirectory, name);
};
