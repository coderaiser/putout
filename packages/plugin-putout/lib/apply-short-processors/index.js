import {types, operator} from 'putout';

const {compute, rename} = operator;
const {identifier} = types;

const isString = (a) => typeof a === 'string';
const chooseType = (a) => a === '__ignore' ? '__array' : '__object';

const getShortName = (a) => {
    return a
        .slice(0, a.indexOf('('))
        .replace('putout_processor_', '');
};

export const report = ({value}) => {
    const name = getShortName(value);
    return `Use '[${name}]' instead of '${value}'`;
};

export const fix = ({path, value}) => {
    const name = getShortName(value);
    
    path.node.key = identifier(name);
    path.node.computed = true;
    rename(path.get('value'), '__a', chooseType(name));
};

export const traverse = ({push}) => ({
    ObjectProperty(path) {
        const [is, value] = compute(path.get('key'));
        
        if (!is)
            return;
        
        if (!isString(value))
            return;
        
        if (!value.includes('__putout_processor'))
            return;
        
        push({
            path,
            value,
        });
    },
});
