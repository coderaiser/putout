module.exports.report = (file, {name}) => `Remove '${file.node.name}'`;

module.exports.fix = (file, {}) => {
    removeFile(file);
};

module.exports.scan = (path, {push, options}) => {
    const {names} = options;
    
    if (!names)
        return;
    
    for (const name of names) {
        const files = findFile(path, name);
        
        for (const file of files) {
            push(file, {
                name,
            });
        }
    }
};
