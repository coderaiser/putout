import {types} from 'putout';

const {
    isStringLiteral,
    isArrayExpression,
} = types;

export const isPlugins = (node) => node.properties.find(is('plugins'));
export const isExtends = (node) => node.properties.find(is('extends'));

export const getPlugins = get('plugins');
export const getExtends = get('extends');

export const getRules = (node) => {
    const x = node.properties.find(is('rules'));
    
    if (!x)
        return [];
    
    return x.value.properties;
};

function get(name) {
    return (node) => {
        const x = node.properties.find(is(name));
        
        if (!x)
            return [];
        
        if (!isArrayExpression(x.value))
            return [];
        
        return x.value.elements;
    };
}

function is(name) {
    return ({key}) => {
        return isStringLiteral(key, {
            value: name,
        });
    };
}
