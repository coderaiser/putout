import {types} from '@putout/babel';
import {traverseProperties} from '@putout/operate';
import {__ignore} from '@putout/operator-json';

const {stringLiteral} = types;

export const sortIgnore = ({name, property, type = __ignore}) => ({
    report: createReport({
        name,
        property,
    }),
    fix,
    traverse: createTraverse({
        type,
        property,
    }),
});

const createReport = ({name, property}) => () => {
    if (property)
        return `Sort '${property}' section of '${name}'`;
    
    return `Sort '${name}'`;
};

const fix = ({path, sortedElements}) => {
    path.node.elements = sortedElements;
};

const createTraverse = ({type, property}) => ({push}) => ({
    [type]: (path) => {
        const parentOfElements = parseElements(path, {
            property,
        });
        
        if (!parentOfElements)
            return;
        
        const {elements} = parentOfElements.node;
        
        const sortedElements = cleverSort(elements, {
            separate: !property,
        });
        
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
        
        if (!arg.node.elements)
            return null;
        
        return arg;
    }
    
    const [prop] = traverseProperties(path, property);
    
    if (!prop)
        return null;
    
    return prop.get('value');
}

function cleverSort(elements, {separate}) {
    const twoStars = [];
    const noStars = [];
    
    for (const element of elements) {
        const {value} = element;
        
        if (value.startsWith('**/')) {
            twoStars.push(element);
            continue;
        }
        
        noStars.push(element);
    }
    
    const sortedElements = [
        ...sortElements(twoStars, {
            separate,
        }),
        ...sortElements(noStars, {
            separate,
        }),
    ];
    
    if (!sortedElements.at(-1).value)
        return sortedElements.slice(0, -1);
    
    return sortedElements;
}

function sortElements(elements, {separate} = {}) {
    const masks = [];
    const hidden = [];
    const files = [];
    const dirs = [];
    const allowed = [];
    
    for (const element of elements) {
        const value = cutStars(element);
        
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
        
        if (value.startsWith('!')) {
            allowed.push(element);
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
        ...maybeSeparate(masks, {
            separate,
        }),
        ...maybeSeparate(hidden, {
            separate,
        }),
        ...maybeSeparate(files, {
            separate,
        }),
        ...maybeSeparate(dirs, {
            separate,
        }),
        ...maybeSeparate(allowed, {
            allowed,
        }),
    ];
    
    return sortedElements;
}

function maybeSeparate(array, {separate} = {}) {
    if (!separate)
        return array;
    
    if (!array.length)
        return [];
    
    return [
        ...array,
        stringLiteral(''),
    ];
}

const cutStars = ({value}) => {
    if (!value)
        return '';
    
    if (value.startsWith('**/'))
        return value.slice(3);
    
    return value;
};
