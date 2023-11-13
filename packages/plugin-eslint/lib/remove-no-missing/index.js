'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Remove 'node/no-missing-(require,import)'`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    ObjectProperty(path) {
        if (path.node.key.value === 'node/no-missing-require') {
            push(path);
            return;
        }
        
        if (path.node.key.value === 'node/no-missing-import')
            push(path);
    },
});
