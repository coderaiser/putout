import {types} from '@putout/babel';
import {traverseProperties} from '@putout/operate';
import {__ignore} from '@putout/operator-json';

const {stringLiteral} = types;

export const sortIgnore = ({name, property, type = __ignore}) => ({
    report: createReport(name),
    fix,
    traverse: createTraverse({
        type,
        property,
    }),
});

const createReport = (filename) => () => {
    return `Sort '${filename}'`;
};

const fix = ({path, sortedElements}) => {
    path.node.elements = sortedElements;
};

const createTraverse = ({type, property}) => ({push}) => ({
    [type]: (path) => {
        const masks = [];
        const hidden = [];
        const files = [];
        const dirs = [];
        
        const parentOfElements = parseElements(path, {
            property,
        });
        
        if (!parentOfElements)
            return;
        
        const {elements} = parentOfElements.node;
        
        for (const element of elements) {
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
        
        const sortedElements = [
            ...maybeSeparate(masks, property),
            ...maybeSeparate(hidden, property),
            ...maybeSeparate(files, property),
            ...dirs,
        ];
        
        for (const [index, {value}] of elements.entries()) {
            const current = sortedElements[index];
            
            if (current.value !== value) {
                push({
                    path: parentOfElements,
                    sortedElements,
                });
                break;
            }
        }
    },
});

function parseElements(path, {property}) {
    if (!property) {
        const [arg] = path.get('arguments');
        return arg;
    }
    
    const [prop] = traverseProperties(path, property);
    
    if (!prop)
        return null;
    
    return prop.get('value');
}

function maybeSeparate(array, property) {
    if (property)
        return array;
    
    if (!array.length)
        return [];
    
    return [
        ...array,
        stringLiteral(''),
    ];
}
