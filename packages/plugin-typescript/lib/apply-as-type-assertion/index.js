import {operator, types} from 'putout';

const {TSAsExpression} = types;
const {replaceWith} = operator;

export const report = () => '"as" should be used for type assertions';

export const fix = (path) => {
    const typeName = path.get('typeAnnotation').node;
    const expression = path.get('expression').node;
    
    replaceWith(path, TSAsExpression(expression, typeName));
};

export const include = () => [
    'TSTypeAssertion',
];
