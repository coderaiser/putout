'use strict';

module.exports = (name = '', dir) => {
    if (!dir)
        return name;
    
    if (dir === '/')
        return name.replace('/', '');
    
    return name.replace(`${dir}/`, '');
};

