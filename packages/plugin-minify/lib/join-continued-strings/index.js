import {operator} from 'putout';

const {getLiteralRaw} = operator;

export const report = () => `Join continued strings`;

export const fix = (path) => {
    if (path.isTemplateLiteral()) {
        const {quasis} = path.node;
        
        for (const element of quasis)
            element.value.raw = element.value.cooked;
        
        return;
    }
    
    path.node.raw = path.node.value;
};

export const include = () => [
    'TemplateLiteral',
    'StringLiteral',
];

export const filter = (path) => {
    if (path.isTemplateLiteral()) {
        const {quasis} = path.node;
        
        for (const {value} of quasis) {
            if (getLiteralRaw(value).includes('\\\n'))
                return true;
        }
        
        return false;
    }
    
    return getLiteralRaw(path).includes('\\\n');
};
