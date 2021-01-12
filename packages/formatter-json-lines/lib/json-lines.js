'use strict';

const {stringify} = JSON;

module.exports = ({name, source, places, index, count, filesCount, errorsCount}) => {
    const json = stringify({
        name,
        source,
        places,
        index,
        count,
        filesCount,
        errorsCount,
    });
    
    return `${json}\n`;
};

