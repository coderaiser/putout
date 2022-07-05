'use strict';

module.exports.report = () => `Use 'isNumericLiteral()' instead of 'isNumberLiteral()'`;

module.exports.fix = (path) => {
    path.scope.rename('isNumberLiteral', 'isNumericLiteral');
    path.scope.rename('NumberLiteral', 'NumericLiteral');
};

module.exports.traverse = ({push}) => ({
    'isNumberLiteral(__a)': (path) => {
        push(path);
    },
    'NumberLiteral(__a)': (path) => {
        push(path);
    },
});

