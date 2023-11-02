'use strict';

const {operator, types} = require('putout');
const {ObjectProperty} = types;
const {
    insertAfter,
    remove,
    getProperties,
    getProperty,
} = operator;

module.exports.report = () => `Move 'formatter' up`;

module.exports.match = () => ({
    '__putout_processor_json(__object)': (vars, path) => {
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
    '__putout_processor_json(__object)': (vars, path) => {
        const objectPath = path.get('arguments.0');
        const {
            formatterPath,
            parserPath,
            printerPath,
        } = getProperties(objectPath, ['formatter', 'parser', 'printer']);
        
        const {key, value} = formatterPath.node;
        const node = ObjectProperty(key, value);
        
        remove(formatterPath);
        
        if (!parserPath && !printerPath)
            objectPath.node.properties.unshift(node);
        else if (printerPath && !printerPath.getPrevSibling().node)
            insertAfter(printerPath, node);
        else if (parserPath && !parserPath.getPrevSibling().node)
            insertAfter(parserPath, node);
        
        return path;
    },
});
