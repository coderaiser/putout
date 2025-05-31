import {types, operator} from 'putout';

const {replaceWith, compute} = operator;

const {isIdentifier, booleanLiteral} = types;

export const report = () => 'Avoid constant conditions';

export const fix = ({path, value}) => {
    replaceWith(path, booleanLiteral(value));
};

export const traverse = ({push}) => ({
    BinaryExpression(path) {
        const {
            left,
            right,
            operator,
        } = path.node;
        
        if (!/<|>|===?|!===?/.test(operator))
            return;
        
        if (/<<|>>/.test(operator))
            return;
        
        const [confident, value] = compute(path);
        
        if (confident)
            return push({
                path,
                value,
            });
        
        if (sameIdentifiers(left, right))
            return push({
                path,
                value: /^===?$/.test(operator),
            });
    },
});

function sameIdentifiers(left, right) {
    if (!isIdentifier(left))
        return false;
    
    if (!isIdentifier(right))
        return false;
    
    return left.name === right.name;
}
