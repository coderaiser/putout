import {operator} from 'putout';

const {setLiteralValue} = operator;

export const report = () => `Set 'column: 1' instead of 'column: 0'`;

export const fix = (path) => {
    setLiteralValue(path, 1);
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        const valuePath = path.get('value');
        const keyPath = path.get('key');
        
        if (!valuePath.isNumericLiteral())
            return;
        
        if (!keyPath.isIdentifier({name: 'column'}))
            return;
        
        if (!valuePath.node.value)
            push(valuePath);
    },
});
