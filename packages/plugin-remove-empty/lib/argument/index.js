'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => 'Empty argument should be avoided';

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    '(__args) => __a'(path) {
        const params = path.get('params');
        const {length} = params;
        
        if (!length)
            return;
        
        const lastPath = params[length - 1];
        
        if (lastPath.isObjectPattern() && !lastPath.node.properties.length)
            push(lastPath);
        
        if (lastPath.isArrayPattern() && !lastPath.node.elements.length)
            push(lastPath);
    },
});

