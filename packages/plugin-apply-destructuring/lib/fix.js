'use strict';

const {template} = require('putout');

module.exports = (path) => {
    const {
        node,
        parentPath,
    } = path;
    
    const {
        id,
        init,
    } = node;
    
    const PROPERTY = id;
    const OBJECT = init.object;
    const {kind} = parentPath.node;
    
    const convert = template(`
        ${kind} {
            PROPERTY
        } = OBJECT;
    `);
    
    const resultNode = convert({
        PROPERTY,
        OBJECT,
    });
    
    parentPath.replaceWith(resultNode);
};

