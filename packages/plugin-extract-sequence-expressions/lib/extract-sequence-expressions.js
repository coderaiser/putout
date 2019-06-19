'use strict';

const {replaceWithMultiple} = require('putout').operate;

module.exports.report = () => 'sequence expressions should not be used';

module.exports.fix = (path) => {
    const {expressions} = path.node;
    
    replaceWithMultiple(path, expressions);
};

module.exports.traverse = ({push}) => {
    return {
        SequenceExpression(path) {
            push(path);
        },
    };
};

