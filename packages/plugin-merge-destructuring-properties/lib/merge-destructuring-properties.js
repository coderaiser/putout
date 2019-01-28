'use strict';

module.exports.report = () => 'Object properties should be merged when destructuring';

module.exports.find = require('./find');

module.exports.fix = ({path, places}) => {
    const {node} = path;
    const {properties} = node.id;
    
    for (const place of places) {
        node.id.properties = [
            ...properties,
            ...place.node.id.properties,
        ];
        
        place.remove();
    }
};

