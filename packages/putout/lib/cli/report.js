'use strict';

const {isArray} = Array;
const noop = () => {};

module.exports = () => {
    let filesCount = 0;
    let errorsCount = 0;
    
    return async (formatter, options) => {
        const {
            name,
            rule,
            source,
            places,
            index = 0,
            count = 1,
            trace = noop,
            formatterOptions = {},
        } = options;
        
        if (!isArray(places))
            throw Error(`☝️ Looks like for 'places: Places[]' you passed the wrong type: '${typeof places}'`);
        
        if (places.length)
            ++filesCount;
        
        errorsCount += places.length;
        
        trace('progress', {
            rule,
            name,
            options: formatterOptions,
            source,
            places,
            index,
            count,
            filesCount,
            errorsCount,
        });
        
        return await formatter({
            rule,
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
