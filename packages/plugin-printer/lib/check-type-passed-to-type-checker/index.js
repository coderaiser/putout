import {types} from 'putout';

const {
    isIdentifier,
    isCallExpression,
} = types;

const ARROW = ' -> ';
const ARROW_NOT = ' -> !';
const ARROW_LENGTH = ARROW.length;
const ARROW_NOT_LENGTH = ARROW_NOT.length;
const NOT = '!';

const TYPES = new Set([
    'CommentBlock',
]);

export const report = ({type}) => {
    return `Unknown type detected: '${type}'`;
};

export const fix = () => {};

export const traverse = ({push}) => ({
    StringLiteral(path) {
        const call = path.find(isCallExpression);
        
        if (!call)
            return;
        
        if (!isIdentifier(call.node.callee, {name: 'createTypeChecker'}))
            return;
        
        const {value} = path.node;
        
        if (!value.includes(ARROW)) {
            if (/^[a-zA-Z].+/.test(value) && !isExists(value))
                push({
                    path,
                    type: value,
                });
            
            return;
        }
        
        if (value.includes(NOT)) {
            const arrowNotIndex = value.indexOf(ARROW_NOT);
            const typeNotIndex = arrowNotIndex + ARROW_NOT_LENGTH;
            
            const type = value.slice(typeNotIndex, value.length);
            
            if (!isExists(type))
                push({
                    path,
                    type,
                });
            
            return;
        }
        
        const arrowIndex = value.indexOf(ARROW);
        const typeIndex = arrowIndex + ARROW_LENGTH;
        
        const type = value.slice(typeIndex, value.length);
        
        if (!isExists(type))
            push({
                path,
                type,
            });
    },
});

function isExists(type) {
    if (types[`is${type}`])
        return true;
    
    return TYPES.has(type);
}
