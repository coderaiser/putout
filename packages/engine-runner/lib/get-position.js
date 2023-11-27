'use strict';

const getPath = (item) => item.path || item[0] || item;

module.exports.getPath = getPath;
module.exports.getPosition = (path, shebang) => {
    const parsedPath = getPath(path);
    
    validatePath(parsedPath);
    
    const {node} = parsedPath;
    const {loc} = node;
    
    if (!loc)
        return {
            line: 0,
            column: 0,
        };
    
    const {line, column} = node.loc.start;
    
    return {
        line: shebang ? line + 1 : line,
        column,
    };
};

function validatePath(path) {
    if (!path.node)
        throw Error(`☝️ Looks like 'push' called without a 'path' argument.`);
}
