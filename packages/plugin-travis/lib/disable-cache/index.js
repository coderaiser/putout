import {
    types,
    operator,
} from 'putout';

const {__yaml} = operator;
const {
    BooleanLiteral,
    StringLiteral,
    ObjectProperty,
} = types;

const isCache = (property) => property.key.value === 'cache';

export const report = () => '"cache" field should exist in travis';

export const match = () => ({
    [__yaml]({__object}) {
        return !__object.properties.find(isCache);
    },
});

export const replace = () => ({
    [__yaml]({__object}, path) {
        const property = ObjectProperty(StringLiteral('cache'), BooleanLiteral(false));
        __object.properties.push(property);
        
        return path;
    },
});
