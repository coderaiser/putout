module.exports.scan = (path, {push, options}) => {
    const {name, directory} = options;
    
    if (!name || !directory)
        return;
    
    push(path, {
        name,
    });
};
