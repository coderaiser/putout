'use strict';

module.exports.report = () => 'Useless "return" should be avoided';

module.exports.match = () => ({
    'module.exports.traverse = __a'({}, path) {
        const bodyPath = path.get('right.body');
        
        if (!bodyPath.isBlockStatement())
            return false;
        
        const first = bodyPath.get('body.0');
        return first.isReturnStatement();
    },
});

module.exports.replace = () => ({
    'module.exports.traverse = __a'({__a}, path) {
        const [node] = __a.body.body;
        
        __a.body = node.argument;
        
        return path;
    },
});

