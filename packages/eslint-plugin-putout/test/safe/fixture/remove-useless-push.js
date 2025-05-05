const list = [];
    
for (const {isDir, name} of files) {
    if (!isDir)
        list.push(name);
}
