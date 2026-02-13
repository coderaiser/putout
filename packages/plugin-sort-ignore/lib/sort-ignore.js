import {operator, types} from 'putout';

const {stringLiteral} = types;
const {
    getTemplateValues,
    __ignore,
} = operator;

export const report = () => `Sort 'ignore'`;

export const fix = ({path, sorted}) => {
    path.node.arguments[0].elements = sorted;
};

export const traverse = ({push}) => ({
    [__ignore](path) {
        const masks = [];
        const hidden = [];
        const files = [];
        const dirs = [];
        const {__array} = getTemplateValues(path, __ignore);
        
        for (const element of __array.elements) {
            const {value} = element;
            
            if (!value)
                continue;
            
            if (value.startsWith('*')) {
                masks.push(element);
                continue;
            }
            
            if (value.startsWith('.')) {
                hidden.push(element);
                continue;
            }
            
            if (value.includes('.')) {
                files.push(element);
                continue;
            }
            
            if (value.startsWith('#'))
                continue;
            
            dirs.push(element);
        }
        
        const sorted = [
            ...maybeSeparate(masks),
            ...maybeSeparate(hidden),
            ...maybeSeparate(files),
            ...dirs,
        ];
        
        for (const [index, {value}] of __array.elements.entries()) {
            const current = sorted[index];
            
            if (current.value !== value) {
                push({
                    path,
                    sorted,
                });
                break;
            }
        }
    },
});

function maybeSeparate(array) {
    if (!array.length)
        return [];
    
    return [
        ...array,
        stringLiteral(''),
    ];
}
