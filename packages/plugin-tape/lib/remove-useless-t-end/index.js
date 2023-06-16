'use strict';

const {operator} = require('putout');
const {traverse, remove} = operator;

module.exports.report = () => `Avoid useless 't.end()'`;

module.exports.fix = (path) => {
    remove(path);
};

const TEST = 'test("__a", (t) => __body)';

module.exports.traverse = ({push}) => ({
    [TEST]: (path) => {
        const paths = [];
        
        traverse(path, {
            't.end()': (path) => {
                paths.push(path);
            },
        });
        
        if (paths.length > 1)
            push(paths.pop());
    },
});
