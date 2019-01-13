'use strict';

module.exports.report = () => 'Unexpected "debugger" statement';

module.exports.find = (ast, {traverse}) => {
    const places = [];
    
    traverse(ast, {
        DebuggerStatement(path) {
            places.push(path);
        }
    });
    
    return places;
};

module.exports.fix = (path) => {
    path.remove();
};

