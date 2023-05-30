'use strict';

const {operator} = require('putout');
const {rename} = operator;

module.exports.report = () => `Use 'Routes' instead of 'Switch'`;

module.exports.fix = (path) => {
    rename(path, 'Switch', 'Routes');
};

module.exports.traverse = ({push}) => ({
    Program(path) {
        const {Switch} = path.scope.bindings;
        
        if (!Switch)
            return;
        
        push(Switch.path);
    },
});
