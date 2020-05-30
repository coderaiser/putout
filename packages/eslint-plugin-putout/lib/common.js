'use strict';

module.exports.isCorrectLoc = (line, properties) => {
    const n = properties.length;
    
    for (let i = 0; i < n; i++) {
        const prop = properties[i];
        
        if (prop.loc.start.line !== i + line + 1)
            return false;
    }
    
    return true;
};

