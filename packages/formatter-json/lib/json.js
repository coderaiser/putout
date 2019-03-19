'use strict';

let errors = [];

module.exports = ({name, places, index, count, filesCount, errorsCount}) => {
    const result = jsonFormatter({
        name,
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

function jsonFormatter({name, places, index, count, filesCount, errorsCount}) {
    if (places.length)
        errors.push({
            name,
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

