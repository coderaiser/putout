'use strict';

module.exports.report = () => 'Avoid setter return type';

module.exports.fix = (path) => {
    delete path.node.returnType;
};

module.exports.traverse = ({push}) => ({
    TSMethodSignature(path) {
        const {kind} = path.node;
        
        if (kind !== 'set')
            return;
        
        if (!path.node.returnType)
            return;
        
        push(path);
    },
});
