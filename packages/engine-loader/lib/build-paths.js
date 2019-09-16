'use strict';

const addNodeModules = (a) => `${a}/node_modules`;

module.exports = (path) => {
    const names = path.split('/').slice(1);
    const result = [''];
    
    let current = '';
    
    for (const name of names) {
        current += `/${name}`;
        result.push(current);
    }
    
    return result
        .map(addNodeModules);
};

