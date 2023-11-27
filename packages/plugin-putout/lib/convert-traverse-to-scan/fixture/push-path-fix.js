module.exports.report = ({path, name}) => `Remove '${path.node.name}'`;

module.exports.fix = ({path}) => {
    removeFile(path);
};

module.exports.scan = (path, {push, options}) => {
    const {names} = options;
    
    if (!names)
        return;
    
    for (const name of names) {
        const files = findFile(path, name);
        
        for (const file of files) {
            push(file);
        }
    }
};
