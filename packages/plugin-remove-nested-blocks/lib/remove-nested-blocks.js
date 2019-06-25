'use strict';

module.exports.report = () => 'Nested blocks should not be used';

module.exports.fix = (path) => {
    path.replaceWithMultiple(path.node.body);
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

