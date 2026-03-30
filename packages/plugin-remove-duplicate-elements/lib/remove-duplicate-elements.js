import {operator, types} from 'putout';

const {isStringLiteral} = types;
const {remove} = operator;
const hasValue = (a) => a.node.value;

export const report = ({node}) => `Avoid duplicate elements: '${node.value}'`;

export const fix = (path) => {
    remove(path);
};

export const traverse = ({push}) => ({
    ArrayExpression(path) {
        const values = new Set();
        const elements = path.get('elements').filter(isStringLiteral)
            .filter(hasValue);
        
        for (const element of elements) {
            const {value} = element.node;
            
            if (values.has(value)) {
                const prev = element.getPrevSibling();
                const next = element.getNextSibling();
                
                if (!hasValue(prev) && !hasValue(next))
                    push(prev);
                
                push(element);
                
                continue;
            }
            
            values.add(value);
        }
    },
});
