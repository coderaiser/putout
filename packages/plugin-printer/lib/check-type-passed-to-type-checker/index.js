import {types, operator} from 'putout';

const {
    isIdentifier,
    isCallExpression,
} = types;

const {setLiteralValue} = operator;
const ARROW = ' -> ';
const ARROW_NOT = ' -> !';
const ARROW_LENGTH = ARROW.length;
const ARROW_NOT_LENGTH = ARROW_NOT.length;
const MARK = '🧨';
const NOT = '!';

export const report = ({type}) => {
    return `Unknown type detected: '${type}'`;
};

export const fix = ({path, type}) => {
    const {value} = path.node;
    setLiteralValue(path, value.replace(type, `${MARK} ${type}`));
};

export const traverse = ({push}) => ({
    StringLiteral(path) {
        const call = path.find(isCallExpression);
        
        if (!call)
            return;
        
        if (!isIdentifier(call.node.callee, {name: 'createTypeChecker'}))
            return;
        
        const {value} = path.node;
        
        if (value.includes(MARK))
            return;
        
        if (!value.includes(ARROW))
            return;
        
        if (value.includes(NOT)) {
            const arrowNotIndex = value.indexOf(ARROW_NOT);
            const typeNotIndex = arrowNotIndex + ARROW_NOT_LENGTH;
            
            const type = value.slice(typeNotIndex, value.length);
            
            if (!types[`is${type}`])
                push({
                    path,
                    type,
                });
            
            return;
        }
        
        const arrowIndex = value.indexOf(ARROW);
        const typeIndex = arrowIndex + ARROW_LENGTH;
        
        const type = value.slice(typeIndex, value.length);
        
        if (!types[`is${type}`])
            push({
                path,
                type,
            });
    },
});
