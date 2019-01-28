'use strict';

const {template} = require('putout');

const convert = template(`
    const {
        PROPERTY
    } = OBJECT;
`);

module.exports = (path) => {
    const {
        id,
        init,
    } = path.node;
    
    const PROPERTY = id;
    const OBJECT = init.object;
    
    const resultNode = convert({
        PROPERTY,
        OBJECT,
    });
    
    path.parentPath.replaceWith(resultNode);
};

