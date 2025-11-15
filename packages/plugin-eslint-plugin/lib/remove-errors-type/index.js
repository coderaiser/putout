'use strict';

const {operator, types} = require('putout');

const {isIdentifier} = types;
const {remove} = operator;

module.exports.report = () => `Remove 'type' field`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    ObjectProperty(path) {
        const {key} = path.node;
        
        if (!isIdentifier(key, {name: 'type'}))
            return;
        
        const {parentPath} = path.parentPath.parentPath;
        
        if (!isIdentifier(parentPath.node.key, {name: 'errors'}))
            return;
        
        push(path);
    },
});
