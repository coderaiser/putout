'use strict';

module.exports = ({path, places}) => {
    const {node} = path;
    
    for (const place of places) {
        node.id.properties = [
            ...node.id.properties,
            ...place.node.id.properties,
        ];
        
        place.remove();
    }
};

