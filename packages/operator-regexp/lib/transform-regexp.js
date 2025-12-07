'use strict';

const regexpTree = require('regexp-tree');

module.exports.transformRegExp = (str, regExpTransformer) => {
    check(regExpTransformer);
    
    const {
        report,
        traverse,
        fix,
    } = regExpTransformer;
    
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

function check(regExpTransformer) {
    if (!regExpTransformer)
        throw Error('☝️ Looks like RegExpTransformer is missing');
}
