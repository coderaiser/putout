'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Remove 'node/no-unsupported-features'`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    ObjectProperty(path) {
        if (path.node.key.value === 'node/no-unsupported-features/es-syntax')
            push(path);
    },
});
