import {types} from 'putout';

const {isObjectPattern} = types;

const {keys} = Object;
const TYPES = keys(types);

export const report = () => `require: ('@putout/babel') -> ('putout/babel').types`;

export const match = () => ({
    'const __a = require("@putout/babel")': ({__a}) => {
        if (!isObjectPattern(__a))
            return false;
        
        const {properties} = __a;
        
        if (properties.length > 1) {
            const [, second] = properties;
            return TYPES.includes(second.value.name);
        }
        
        const [first] = properties;
        const {name} = first.value;
        
        if (name === 'traverse')
            return false;
        
        return TYPES.includes(name);
    },
});

export const replace = () => ({
    'const {types, __a} = require("@putout/babel")': `{
        const {types} = require("@putout/babel");
        const {__a} = types;
    }`,
    'const __a = require("@putout/babel")': 'const __a = require("@putout/babel").types',
    'const __a = require("@putout/babel").types': `{
        const {types} = require("@putout/babel");
        const __a = types;
    }`,
});
