'use strict';

module.exports = ({path, places}) => {
    const {node} = path;
    const {properties} = node.id;
    
    for (const place of places) {
        node.id.properties += [
            ...properties,
            ...place.node.id.properties,
        ];
    }
};

