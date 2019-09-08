'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWith} = operate;
const {binaryExpression} = types;

module.exports.report = () => 'operator "**" should be used instead of Math.pow';

module.exports.fix = ({path, left, right}) => {
    replaceWith(path, binaryExpression('**', left, right));
};

module.exports.traverse = ({push}) => {
    return {
        'Math.pow(__)'(path) {
            const [left, right] = path.node.arguments;
            
            push({
                path,
                left,
                right,
            });
        },
    };
};

