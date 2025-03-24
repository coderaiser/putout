import {types} from 'putout';

const {
    objectProperty,
    isRestElement,
    objectPattern,
} = types;

export const report = () => `Use 'formState.errors' instead of 'errors'`;

const COMPUTED = false;
const SHORTHAND = true;

export const exclude = () => [
    'const __object = formState',
];

export const match = () => ({
    'const __object = __a': ({__object}, path) => {
        const bindings = path.scope.getAllBindings();
        
        if (!bindings.useFormContext && !bindings.useForm)
            return false;
        
        for (const property of __object.properties) {
            if (isRestElement(property))
                continue;
            
            if (property.key.name === 'errors')
                return true;
        }
        
        return false;
    },
});

export const replace = () => ({
    'const __object = __a': ({__object}, path) => {
        for (const property of __object.properties) {
            if (isRestElement(property))
                continue;
            
            if (property.key.name === 'errors') {
                const key = {
                    ...property.key,
                };
                
                property.key.name = 'formState';
                
                property.value = objectPattern([objectProperty(key, key, COMPUTED, SHORTHAND)]);
            }
        }
        
        return path;
    },
});
