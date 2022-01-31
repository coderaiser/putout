'use strict';

module.exports.report = () => 'Avoid useless mapping modifiers';

module.exports.fix = ({node}) => {
    const {optional, readonly} = node;
    
    if (optional === '+')
        node.optional = true;
    
    if (readonly === '+')
        node.readonly = true;
};

module.exports.traverse = ({push}) => ({
    TSMappedType(path) {
        const {optional, readonly} = path.node;
        
        if (optional === '+' || readonly === '+')
            push(path);
    },
});
