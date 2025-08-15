'use strict';

const regexpTree = require('regexp-tree');

module.exports.transformRegExp = (str, {report, traverse, fix}) => {
    const ast = regexpTree.parse(str, {
        captureLocations: true,
    });
    
    const places = [];
    const push = (path) => {
        const {start} = (path.path || path).node.loc;
        
        places.push({
            position: start,
            message: report(path),
        });
        
        fix(path);
    };
    
    regexpTree.traverse(ast, traverse({
        push,
    }));
    
    return [
        regexpTree.generate(ast),
        places,
    ];
};
