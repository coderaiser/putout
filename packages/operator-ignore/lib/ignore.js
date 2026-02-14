import {types} from '@putout/babel';
import {
    remove,
    traverseProperties,
} from '@putout/operate';
import {__ignore} from '@putout/operator-json';
import picomatch from 'picomatch';

const {stringLiteral} = types;
const getValue = ({node}) => node.value;

export const ignore = ({name, property, list, type = __ignore}) => ({
    report: createReport(name),
    fix,
    traverse: createTraverse({
        type,
        property,
        list,
    }),
});

const addQuotes = (a) => `'${a}'`;

const createReport = (filename) => ({name, matchedElements}) => {
    let insteadOf = '';
    
    if (matchedElements.length) {
        const replacedNames = matchedElements.map(getValue);
        const namesLine = replacedNames
            .map(addQuotes)
            .join(', ');
        
        insteadOf = ` instead of ${namesLine}`;
    }
    
    return `Add '${name}'${insteadOf} to '${filename}'`;
};

export const fix = ({path, name, matchedElements}) => {
    path.node.elements.push(stringLiteral(name));
    matchedElements.map(remove);
};

const createTraverse = ({type, property, list}) => ({push, options}) => {
    const {dismiss = []} = options;
    const newNames = filterNames(list, dismiss);
    
    if (!newNames.length)
        return {};
    
    return {
        [type]: (path) => {
            const [parentOfElements, elements] = parseElements(path, {
                property,
            });
            
            if (!parentOfElements)
                return;
            
            const list = elements.map(getValue);
            
            for (const name of newNames) {
                if (list.includes(name))
                    continue;
                
                const match = picomatch(name);
                const matchedElements = [];
                
                for (const current of elements.filter(exists)) {
                    const {value} = current.node;
                    
                    if (match(value))
                        matchedElements.push(current);
                }
                
                push({
                    path: parentOfElements,
                    matchedElements,
                    elements,
                    name,
                });
            }
        },
    };
};

function filterNames(names, dismiss) {
    const newNames = [];
    
    for (const name of names) {
        if (dismiss.includes(name))
            continue;
        
        newNames.push(name);
    }
    
    return newNames;
}

const exists = ({node}) => Boolean(node);
const emptyList = [];

function parseElements(path, {property}) {
    if (!property) {
        const [arg] = path.get('arguments');
        return [arg, arg.get('elements')];
    }
    
    const [prop] = traverseProperties(path, property);
    
    if (!prop)
        return [null, emptyList];
    
    const valuePath = prop.get('value');
    
    return [valuePath, valuePath.get('elements')];
}
