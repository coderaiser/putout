'use strict';

module.exports.renameProperty = (path, from, to) => {
    path.traverse({
        ObjectProperty(path) {
            const {node} = path;
            const {key, value} = node;
            
            if (key.name !== from)
                return;
            
            key.name = to;
            
            if (key.name === value.name)
                node.shorthand = true;
            
            path.stop();
        },
    });
};
