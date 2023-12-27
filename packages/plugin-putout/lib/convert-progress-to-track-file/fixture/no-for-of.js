module.exports.scan = (root, {push, progress}) => {
    const files = findFile(root, ['*']);
    const n = files.length;
    
    push(file);
    progress({
        i: 0,
        n,
    });
};
