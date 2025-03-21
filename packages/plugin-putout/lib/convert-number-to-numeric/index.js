import {operator} from 'putout';

const {rename} = operator;

export const report = () => `Use 'isNumericLiteral()' instead of 'isNumberLiteral()'`;

export const fix = (path) => {
    const bindings = path.scope.getAllBindings();
    const {name} = path.node.callee;
    const program = path.scope.getProgramParent().path;
    
    if (!bindings.isNumericLiteral)
        rename(program, 'isNumberLiteral', 'isNumericLiteral');
    
    if (!bindings.NumericLiteral)
        rename(program, 'NumberLiteral', 'NumericLiteral');
    
    path.node.callee.name = name.replace('Number', 'Numeric');
};

export const include = () => [
    'isNumberLiteral(__a)',
    'NumberLiteral(__a)',
];
