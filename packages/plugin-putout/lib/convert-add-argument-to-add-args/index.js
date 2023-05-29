'use strict';

const {operator} = require('putout');
const {rename} = operator;

module.exports.report = () => 'Use addArgs instead of addArgument';

module.exports.replace = () => ({
    'addArgument(__args)': (vars, path) => {
        const program = path.scope.getProgramParent().path;
        rename(program, 'addArgument', 'addArgs');
        
        return path;
    },
});
