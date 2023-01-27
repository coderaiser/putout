'use strict';

const {types} = require('putout');

const {
    ObjectProperty,
    ObjectPattern,
} = types;

module.exports.report = () => `Use 'formState.errors' instead of 'errors'`;

const COMPUTED = false;
const SHORTHAND = true;

module.exports.match = () => ({
    'const __object = useForm()': ({__object}) => {
        for (const property of __object.properties) {
            if (property.key.name === 'errors') {
                return true;
            }
        }
        
        return false;
    },
});

module.exports.replace = () => ({
    'const { errors } = useForm()': 'const { formState: { errors } } = useForm()',
    'const __object = useForm()': ({__object}, path) => {
        for (const property of __object.properties) {
            if (property.key.name === 'errors') {
                const key = {
                    ...property.key,
                };
                property.key.name = 'formState';
                property.value = ObjectPattern([
                    ObjectProperty(key, key, COMPUTED, SHORTHAND),
                ]);
            }
        }
        
        return path;
    },
});

