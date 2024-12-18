'use strict';

const {types} = require('putout');
const {isObjectPattern} = types;

const {keys} = Object;
const TYPES = keys(types);

module.exports.report = () => `require: ('@putout/babel') -> ('putout/babel').types`;

module.exports.match = () => ({
    'const __a = require("@putout/babel")': ({__a}) => {
        if (!isObjectPattern(__a))
            return false;
        
        const {properties} = __a;
        
        if (properties.length > 1) {
            const [, second] = properties;
            return TYPES.includes(second.value.name);
        }
        
        const [first] = properties;
        
        return TYPES.includes(first.value.name);
    },
});

module.exports.replace = () => ({
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
