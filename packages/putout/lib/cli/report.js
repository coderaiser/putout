'use strict';

module.exports = () => {
    let filesCount = 0;
    let errorsCount = 0;
    
    return async (formatter, options) => {
        const {
            name,
            source,
            places,
            index = 0,
            count = 1,
            formatterOptions = {},
        } = options;
        
        if (places.length)
            ++filesCount;
        
        errorsCount += places.length;
        
        return await formatter({
            name,
            options: formatterOptions,
            source,
            places,
            index,
            count,
            filesCount,
            errorsCount,
        });
    };
};

