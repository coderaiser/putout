export const getPath = (item) => item.path || item[0] || item;

export const getPosition = (path) => {
    const parsedPath = getPath(path);
    
    validatePath(parsedPath);
    
    const {node} = parsedPath;
    const {loc} = node;
    
    if (!loc)
        return {
            line: 1,
            column: 1,
        };
    
    const {line, column} = node.loc.start;
    
    return {
        line,
        column: column + 1,
    };
};

function validatePath(path) {
    if (!path.node)
        throw Error(`☝️ Looks like 'push' called without a 'path' argument.`);
}
