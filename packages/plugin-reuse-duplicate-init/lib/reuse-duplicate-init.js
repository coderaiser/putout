'use strict';

const {operator} = require('putout');
const {replaceWith} = operator;

module.exports.report = () => 'Duplicate init should be reused';

module.exports.exclude = () => [
    'const __a = __identifier',
];

module.exports.traverse = ({push}) => {
    const allRight = {};
    
    return {
        'const __identifier = __b'(path) {
            const __b = path.get('declarations.0.init').toString();
            
            allRight[__b] = path;
        },
        'const __object = __b'(path) {
            const initPath = path.get('declarations.0.init');
            const __b = initPath.toString();
            
            const main = allRight[__b];
            
            if (!main || !main.node)
                return;
            
            if (path.scope.uid !== main.scope.uid)
                return;
            
            push({
                path,
                main,
            });
        },
    };
};

module.exports.fix = ({path, main}) => {
    const {id} = main.node.declarations[0];
    replaceWith(path.get('declarations.0.init'), id);
};

