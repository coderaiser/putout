import {types} from 'putout';

const {
    BooleanLiteral,
    StringLiteral,
    ObjectProperty,
} = types;

const isCache = (property) => property.key.value === 'cache';

export const report = () => '"cache" field should exist in travis';

export const match = () => ({
    '__putout_processor_json(__a)'({__a}) {
        return !__a.properties.find(isCache);
    },
});

export const replace = () => ({
    '__putout_processor_json(__a)'({__a}, path) {
        const property = ObjectProperty(StringLiteral('cache'), BooleanLiteral(false));
        __a.properties.push(property);
        
        return path;
    },
});
