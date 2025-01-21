'use strict';

const {operator} = require('putout');
const {getBindingPath} = operator;

module.exports.report = () => `Declare 'path' variable`;

module.exports.match = () => ({
    '(__a) => __body': (vars, path) => {
        let is = false;
        
        path.traverse({
            ReferencedIdentifier(refPath) {
                if (refPath.node.name !== 'path')
                    return;
                
                if (getBindingPath(refPath, 'path'))
                    return;
                
                is = true;
                path.stop();
            },
        });
        
        return is;
    },
});

module.exports.replace = () => ({
    '(__a) => __body': '(__a, path) => __body',
});
