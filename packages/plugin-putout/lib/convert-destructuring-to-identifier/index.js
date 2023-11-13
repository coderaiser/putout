'use strict';

const {compare} = require('putout').operator;

module.exports.report = () => 'Identifier should be used instead of empty destructuring';

module.exports.match = () => ({
    '({}) => __body': (vars, path) => findUp(path, 'module.exports.__a = __'),
    '({}, __a) => __body': (vars, path) => findUp(path, 'module.exports.__a = __'),
});

module.exports.replace = () => ({
    '({}) => __body': '(vars) => __body',
    '({}, __a) => __body': '(vars, __a) => __body',
});

function findUp(path, str) {
    while (!path.isProgram()) {
        if (path.isAssignmentExpression())
            return compare(path, str);
        
        path = path.parentPath;
    }
    
    return false;
}
