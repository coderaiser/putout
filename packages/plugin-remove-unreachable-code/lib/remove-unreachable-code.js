'use strict';

module.exports.report = () => `Unreachable code`;

module.exports.fix = ({siblings}) => {
    for (const sibling of siblings) {
        sibling.remove();
    }
};

module.exports.traverse = ({push}) => {
    return {
        'ReturnStatement|ThrowStatement'(path) {
            const siblings = path.getAllNextSiblings();
            
            if (!siblings.length)
                return;
            
            push({
                path: siblings[0],
                siblings,
            });
        },
    };
};

