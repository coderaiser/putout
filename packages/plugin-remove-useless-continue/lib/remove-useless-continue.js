'use strict';

const {EmptyElement} = require('putout').types;

const isLoop = (path) => path.isLoop() || path.parentPath.isLoop();

module.exports.report = () => 'Useless continue should be avoided';

module.exports.fix = (path) => {
    path.parentPath.node.body = EmptyElement;
};

module.exports.traverse = ({push}) => ({
    ContinueStatement(path) {
        const {parentPath} = path;
        
        if (!isLoop(parentPath))
            return;
        
        if (parentPath.get('body') === path) {
            push(path);
            return;
        }
        
        if (parentPath.isBlockStatement()) {
            push(parentPath);
            return;
        }
    },
});
