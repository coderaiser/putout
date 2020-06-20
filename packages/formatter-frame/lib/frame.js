'use strict';

const codeframe = require('@putout/formatter-codeframe');
const {round} = Math;

module.exports = ({name, places, index, count, filesCount, source, errorsCount}) => {
    const naturalIndex = index + 1;
    const str = `\r${progress(naturalIndex, count)}%`;
    
    const result = codeframe({
        name,
        places,
        index,
        count,
        filesCount,
        errorsCount,
        source,
    });
    
    if (naturalIndex === count)
        return `${str}\r${result}`;
    
    return str;
};

function progress(index, count) {
    return round(index / count * 100);
}

