'use strict';

const {operator} = require('putout');
const {
    insertAfter,
    remove,
    getProperties,
    getProperty,
} = operator;

module.exports.report = () => `Move 'formatter' up`;

module.exports.match = () => ({
    '__putout_processor(__object)': (vars, path) => {
        const objectPath = path.get('arguments.0');
        const formatterPath = getProperty(objectPath, 'formatter');
        
        if (!formatterPath)
            return false;
        
        const next = formatterPath.getNextSibling().node;
        const prev = formatterPath.getPrevSibling().node;
        
        return !next && prev;
    },
});

module.exports.replace = () => ({
    '__putout_processor(__object)': (vars, path) => {
        const objectPath = path.get('arguments.0');
        const {formatterPath, parserPath} = getProperties(objectPath, ['formatter', 'parser']);
        
        const {node} = formatterPath;
        
        remove(formatterPath);
        
        if (!parserPath)
            objectPath.node.properties.unshift(node);
        else if (!parserPath.getPrevSibling().node)
            insertAfter(parserPath, node);
        
        return path;
    },
});
