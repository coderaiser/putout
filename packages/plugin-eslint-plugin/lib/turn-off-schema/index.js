import {types, operator} from 'putout';

const {traverseProperties} = operator;
const {booleanLiteral} = types;

export const report = () => `Turn off schema`;

export const fix = (path) => {
    path.node.value = booleanLiteral(false);
};

export const traverse = ({push}) => ({
    ObjectExpression(path) {
        const [schema] = traverseProperties(path, 'schema');
        
        if (!schema)
            return;
        
        if (!schema.get('value').isBooleanLiteral())
            push(schema);
    },
});
