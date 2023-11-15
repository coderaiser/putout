'use strict';

const {operator, types} = require('putout');
const {ObjectProperty} = types;
const {
    insertAfter,
    remove,
    getProperties,
    __json,
} = operator;

module.exports.report = () => `Move 'formatter' up`;

module.exports.match = () => ({
    [__json]: (vars, path) => {
        const objectPath = path.get('arguments.0');
        const {
            formatterPath,
            parserPath,
            printerPath,
        } = getProperties(objectPath, ['formatter', 'parser', 'printer']);
        
        if (!formatterPath)
            return false;
        
        const next = formatterPath.getNextSibling();
        const prev = formatterPath.getPrevSibling();
        
        if (prev === parserPath)
            return false;
        
        if (prev === printerPath)
            return false;
        
        return !next.node && prev.node;
    },
});

module.exports.replace = () => ({
    [__json]: (vars, path) => {
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
