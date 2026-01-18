import {operator} from 'putout';

const {
    getFileType,
    readDirectory,
    getFilename,
    getParentDirectory,
} = operator;

export const findPackage = (file) => {
    const parentDirectory = getParentDirectory(file);
    
    if (!parentDirectory)
        return [];
    
    const directoryName = getFilename(parentDirectory);
    
    for (const currentFile of readDirectory(parentDirectory)) {
        const type = getFileType(currentFile);
        
        if (type === 'directory')
            continue;
        
        const currentName = getFilename(currentFile);
        
        if (currentName.endsWith('package.json'))
            return [directoryName, currentFile];
    }
    
    return findPackage(parentDirectory);
};
