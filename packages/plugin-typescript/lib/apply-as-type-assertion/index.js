import {operator, types} from 'putout';

const {tsAsExpression} = types;
const {replaceWith} = operator;

export const report = () => '"as" should be used for type assertions';

export const fix = (path) => {
    const typeName = path.get('typeAnnotation').node;
    const expression = path.get('expression').node;
    
    replaceWith(path, tsAsExpression(expression, typeName));
};

export const include = () => [
    'TSTypeAssertion',
];
