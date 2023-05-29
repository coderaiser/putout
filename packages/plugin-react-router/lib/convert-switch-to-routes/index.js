'use strict';

module.exports.report = () => `Use 'Routes' instead of 'Switch'`;

module.exports.fix = (path) => {
    path.scope.rename('Switch', 'Routes');
    
    path.traverse({
        ObjectProperty(path) {
            if (path.node.key.name !== 'Switch')
                return;
            
            path.node.key.name = 'Routes';
            path.stop();
        },
    });
};

module.exports.traverse = ({push}) => ({
    Program(path) {
        const {Switch} = path.scope.bindings;
        
        if (!Switch)
            return;
        
        push(Switch.path);
    },
});
