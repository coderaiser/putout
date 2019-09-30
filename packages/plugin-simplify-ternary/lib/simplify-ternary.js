'use strict';

const {
    types,
    operate,
} = require('putout');

const {
    replaceWith,
    compare,
} = operate;
const {LogicalExpression} = types;

module.exports.report = () => 'Unnecessary use of conditional expression for default assignment';

module.exports.fix = ({path, consequent, alternate}) => {
    replaceWith(path, LogicalExpression('||', consequent, alternate));
};

module.exports.traverse = ({push}) => {
    return {
        ConditionalExpression(path) {
            const consequentPath = path.get('consequent');
            
            const {
                test,
                consequent,
                alternate,
            } = path.node;
            
            const {name} = test;
            
            if (consequentPath.isIdentifier({name}))
                return push({
                    path,
                    consequent,
                    alternate,
                });
            
            if (compare(test, consequent))
                return push({
                    path,
                    consequent,
                    alternate,
                });
        },
    };
};
