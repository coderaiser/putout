'use strict';

const {replaceWithMultiple} = require('putout').operate;

module.exports.report = () => 'Nested blocks should not be used';

module.exports.fix = (path) => {
    replaceWithMultiple(path, path.node.body);
};

module.exports.traverse = ({push}) => {
    return {
        BlockStatement(path) {
            if (!path.parentPath.isBlockStatement())
                return;
            
            push(path);
        },
    };
};

