'use strict';

module.exports.renameProperty = (path, from, to) => {
    path.traverse({
        ObjectProperty(path) {
            const {node} = path;
            const {key, value} = node;
            const equal = key.name === value.name;
            
            if (!equal)
                return;
            
            if (key.name !== from)
                return;
            
            key.name = to;
            value.name = to;
            node.shorthand = true;
            
            path.stop();
        },
    });
};
