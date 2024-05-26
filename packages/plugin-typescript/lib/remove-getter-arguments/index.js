'use strict';

module.exports.report = () => 'Avoid getter arguments';

module.exports.fix = (path) => {
    path.node.params = [];
};

module.exports.traverse = ({push}) => ({
    TSMethodSignature(path) {
        if (!path.node.params.length)
            return;
        
        push(path);
    },
});
