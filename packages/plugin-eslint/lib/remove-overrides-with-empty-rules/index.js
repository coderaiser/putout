'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Avoid 'overrides' with empty 'rules'`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    ObjectProperty(path) {
        const {key, value} = path.node;
        
        if (key.value !== 'rules')
            return;
        
        if (value.properties.length)
            return;
        
        const {parentPath: overridesPath} = path.parentPath.parentPath;
        
        if (overridesPath.isExpressionStatement())
            return push(path);
        
        if (overridesPath.node.key.value !== 'overrides')
            return;
        
        if (overridesPath.node.value.elements.length > 1) {
            push(path.parentPath);
            return;
        }
        
        push(overridesPath);
    },
});
