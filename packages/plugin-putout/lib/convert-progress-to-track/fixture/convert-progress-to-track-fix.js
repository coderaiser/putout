module.exports.scan = (root, {push, progress}) => {
    const files = trackFile(root, ['*']);
    const n = files.length;
    
    for (const file of trackFile(root, ['*'])) {
        push(file);
    }
};
