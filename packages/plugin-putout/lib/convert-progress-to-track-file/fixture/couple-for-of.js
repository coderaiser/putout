module.exports.scan = (root, {push, progress}) => {
    const files = findFile(root, ['*']);
    const n = files.length;
    
    for (const [i, file] of files.entries()) {}
    
    for (const [i, file] of files.entries()) {
        push(file);
        progress({
            i,
            n,
        });
    }
};
