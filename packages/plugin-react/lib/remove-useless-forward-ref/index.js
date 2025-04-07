import {types} from 'putout';

const {
    restElement,
    objectPattern,
    isIdentifier,
    objectProperty,
} = types;

export const report = () => `Avoid useless 'forwardRef' in react > 19`;

export const replace = () => ({
    'forwardRef(__a)': ({__a}) => {
        __a.params = buildParams(__a);
        
        return __a;
    },
});

function buildParams({params}) {
    const [props, ref] = params;
    const refProp = objectProperty(ref, ref);
    
    if (isIdentifier(props)) {
        const param = objectPattern([refProp, restElement(props)]);
        
        return [param];
    }
    
    props.properties.unshift(refProp);
    
    return [props];
}
