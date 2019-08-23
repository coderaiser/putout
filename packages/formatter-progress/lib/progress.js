'use strict';

const dump = require('@putout/formatter-dump');

module.exports = ({name, places, index, count, filesCount, errorsCount}) => {
    const naturalIndex = index + 1;
    const str = `\r${progress(naturalIndex, count)}%`;
    const result = dump({
        name,
        places,
        index,
        count,
        filesCount,
        errorsCount,
    });
    
    if (naturalIndex === count)
        return `${str}\r${result}`;
    
    return str;
};

function progress(index, count) {
    return Math.round(index / count * 100);
}

