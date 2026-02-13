import {types} from '@putout/babel';
import {traverseProperties} from '@putout/operate';
import {__ignore} from '@putout/operator-json';

const {stringLiteral} = types;
const getValue = ({value}) => value;

export const ignore = ({name, property, list, type = __ignore}) => {
    const [, collector] = type.split(/[()]/);
    
    return {
        report: createReport(name),
        match: createMatch({
            type,
            property,
            collector,
            list,
        }),
        replace: createReplace({
            type,
            property,
            collector,
            list,
        }),
    };
};

const createReport = (name) => () => `Add ignored files to '${name}'`;

const createMatch = ({type, property, collector, list}) => ({options}) => {
    const {dismiss = []} = options;
    const newNames = filterNames(list, dismiss);
    
    return {
        [type]: (vars) => {
            const elements = parseElements(vars, {
                property,
                collector,
            });
            
            if (!elements)
                return false;
            
            const list = elements.map(getValue);
            
            for (const name of newNames) {
                if (!list.includes(name))
                    return true;
            }
            
            return false;
        },
    };
};

const createReplace = ({type, property, collector, list}) => ({options}) => {
    const {dismiss = []} = options;
    const newNames = filterNames(list, dismiss);
    
    return {
        [type]: (vars, path) => {
            const elements = parseElements(vars, {
                property,
                collector,
            });
            
            const list = elements.map(getValue);
            
            for (const name of newNames) {
                if (!list.includes(name))
                    elements.push(stringLiteral(name));
            }
            
            return path;
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

function parseElements(vars, {property, collector}) {
    const node = vars[collector];
    
    if (!property)
        return node.elements;
    
    const [prop] = traverseProperties(node, property);
    
    if (!prop)
        return null;
    
    return prop.node.value.elements;
}
