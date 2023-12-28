module.exports.scan = (path, {push, trackFile}) => {
    for (const file of trackFile(path, '*.swp')) {
        push(file);
    }
};
