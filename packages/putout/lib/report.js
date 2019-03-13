'use strict';

module.exports = () => {
    let filesCount = 0;
    let errorsCount = 0;
    
    return (formatter, options) => {
        const {
            name,
            places,
            index = 0,
            count = 1,
        } = options;
        
        if (places.length)
            ++filesCount;
        
        errorsCount += places.length;
        
        return formatter({
            name,
            places,
            index,
            count,
            filesCount,
            errorsCount,
        });
    };
};

