'use strict';

let errors = [];

module.exports = ({name, source, places, index, count, filesCount, errorsCount}) => {
    const result = jsonFormatter({
        name,
        source,
        places,
        index,
        count,
        filesCount,
        errorsCount,
    });
    
    if (!result)
        return '';
    
    const json = JSON.stringify(result, null, 4);
    
    return `${json}\n`;
};

module.exports.jsonFormatter = jsonFormatter;

function jsonFormatter({name, source, places, index, count, filesCount, errorsCount}) {
    if (places.length)
        errors.push({
            name,
            source,
            places,
        });
    
    if (index === count - 1) {
        const result = {
            errors,
            filesCount,
            errorsCount,
        };
        
        errors = [];
        return result;
    }
    
    return null;
}

