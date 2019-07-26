'use strict';

const getPath = (item) => item.path || item;

module.exports.getPath = getPath;
module.exports.getPosition = (path, parser = 'babel') => {
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
        line: incIfNotBabel(line, parser),
        column,
    };
};

function incIfNotBabel(line, parser) {
    if (parser === 'babel')
        return line;
    
    return line + 1;
}

