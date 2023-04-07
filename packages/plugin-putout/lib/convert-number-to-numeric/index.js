'use strict';

module.exports.report = () => `Use 'isNumericLiteral()' instead of 'isNumberLiteral()'`;

module.exports.fix = (path) => {
    const bindings = path.scope.getAllBindings();
    const {name} = path.node.callee;
    
    if (!bindings.isNumericLiteral)
        path.scope.rename('isNumberLiteral', 'isNumericLiteral');
    
    if (!bindings.NumericLiteral)
        path.scope.rename('NumberLiteral', 'NumericLiteral');
    
    path.node.callee.name = name.replace('Number', 'Numeric');
};

module.exports.traverse = ({push}) => ({
    'isNumberLiteral(__a)': (path) => {
        push(path);
    },
    'NumberLiteral(__a)': (path) => {
        push(path);
    },
});
