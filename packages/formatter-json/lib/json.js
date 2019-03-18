'use strict';

let errors = [];

module.exports = ({name, places, index, count, filesCount, errorsCount}) => {
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
        const json = JSON.stringify(result, null, 4);
        
        return `${json}\n`;
    }
    
    return '';
};

