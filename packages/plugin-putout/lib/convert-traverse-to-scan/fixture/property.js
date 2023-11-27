module.exports.traverse = ({push, options}) => ({
    [__filesystem]: (path) => {
        const {name, directory} = options;

        if (!name || !directory)
            return;
        
        push({
            name,
            path,
        });
    }
});
