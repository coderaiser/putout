'use strict';

module.exports.report = () => `Use 'Routes' instead of 'Switch'`;

module.exports.fix = (path) => {
    path.scope.rename('Switch', 'Routes');
};

module.exports.traverse = ({push}) => ({
    Program(path) {
        const {Switch} = path.scope.bindings;
        
        if (!Switch)
            return;
        
        push(Switch.path);
    },
});

