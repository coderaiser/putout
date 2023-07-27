'use strict';

const {types, operator} = require('putout');
const {remove} = operator;
const {isFunctionDeclaration} = types;

module.exports.report = () => `Unreachable code`;

module.exports.fix = ({siblings}) => {
    for (const sibling of siblings) {
        remove(sibling);
    }
};

module.exports.traverse = ({push}) => ({
    'ReturnStatement|ThrowStatement'(path) {
        const siblings = path.getAllNextSiblings();
        
        if (!siblings.length)
            return;
        
        if (siblings.find(isFunctionDeclaration))
            return;
        
        push({
            path: siblings[0],
            siblings,
        });
    },
});
