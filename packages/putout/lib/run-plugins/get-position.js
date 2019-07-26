'use strict';

const getPath = (item) => item.path || item;

module.exports.getPath = getPath;
module.exports.getPosition = (path) => {
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
        line,
        column,
    };
};

