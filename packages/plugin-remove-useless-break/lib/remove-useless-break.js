'use strict';

const {operator} = require('putout');
const {remove} = operator;

module.exports.report = () => `Avoid useless 'break'`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    BreakStatement(path) {
        if (!path.parentPath.parentPath.isLoop())
            return false;
        
        if (path.getNextSibling().node)
            return;
        
        push(path);
    },
});
