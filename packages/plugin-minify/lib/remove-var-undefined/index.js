'use strict';

const {operator} = require('putout');
const {compare, remove} = operator;

module.exports.report = () => `Avoid using 'undefined' in variable declaration`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    VariableDeclarator(path) {
        const init = path.get('init');
        
        if (compare(init, 'void 0'))
            return push(init);
        
        if (init.isIdentifier({name: 'undefined'}))
            return push(init);
    },
});
