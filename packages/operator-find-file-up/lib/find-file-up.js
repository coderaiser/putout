import {
    getFileType,
    readDirectory,
    getFilename,
    getParentDirectory,
} from '@putout/operator-filesystem';

export const findFileUp = (file, name) => {
    const parentDirectory = getParentDirectory(file);
    
    if (!parentDirectory)
        return [];
    
    const directoryName = getFilename(parentDirectory);
    
    for (const currentFile of readDirectory(parentDirectory)) {
        const type = getFileType(currentFile);
        
        if (type === 'directory')
            continue;
        
        const currentName = getFilename(currentFile);
        
        if (currentName.endsWith(name))
            return [directoryName, currentFile];
    }
    
    return findFileUp(parentDirectory, name);
};
