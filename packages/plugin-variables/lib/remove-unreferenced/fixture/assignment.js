let files = [];

while (!(files = readDirectory(parentDir)).length) {
    const name = getFilename(parentDir);
    
    if (name === '/')
        break;
}
