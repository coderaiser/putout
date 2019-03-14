'use strict';

const dump = require('@putout/formatter-dump');
const {columns} = process.stdout;
const barLength = 10;

module.exports = ({name, places, index, count, filesCount, errorsCount}) => {
    const str = `\r${progress(index, count)}%`;
    const result = dump({
        name,
        places,
        index,
        count,
        filesCount,
        errorsCount,
    });
    
    if (index + 1 === count)
        return `${str}\r${result}`;
    
    return str;
};

function progress(index, count) {
    return Math.round(index / count * 100);
}

