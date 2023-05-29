'use strict';

module.exports.renameProperty = (path, from, to) => {
    path.traverse({
        ObjectProperty(path) {
            if (path.node.key.name !== from)
                return;
            
            path.node.key.name = to;
            path.stop();
        },
    });
};

