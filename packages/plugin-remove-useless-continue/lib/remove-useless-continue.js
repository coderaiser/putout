'use strict';

const {operator} = require('putout');

const {remove} = operator;

const isLoop = (path) => path.isLoop() || path.parentPath.isLoop();

module.exports.report = () => `Avoid useless 'continue'`;

module.exports.fix = (path) => {
    remove(path);
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
            push(path);
            return;
        }
    },
});
