'use strict';

const getPath = (item) => item.path || item;

module.exports.getPath = getPath;
module.exports.getPosition = (path, shebang) => {
    const {node} = getPath(path);
    const {loc} = node;
    
    if (!loc)
        return {
            line: 'x',
            column: 'x',
        };
    
    const {
        line,
        column,
    } = node.loc.start;
    
    return {
        line: shebang ? line + 1 : line,
        column,
    };
};

