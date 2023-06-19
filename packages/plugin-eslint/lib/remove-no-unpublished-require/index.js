'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Remove 'node/no-unpublished-require'`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    ObjectProperty(path) {
        if (path.node.key.value === 'node/no-unpublished-require')
            push(path);
    },
});
