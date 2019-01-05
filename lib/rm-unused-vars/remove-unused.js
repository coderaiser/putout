'use strict';

const tryCatch = require('try-catch');

const remove = ({path}) => path.remove();

const tryToRemove = (a) => {
    const [e] = tryCatch(remove, a);
    
    if (!e)
        return;
    
    e.loc = a.path.node.loc.start;
    
    throw e;
};

module.exports = (items) => {
    items.forEach(tryToRemove);
};

