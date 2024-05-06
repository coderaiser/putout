'use strict';

const {types} = require('putout');
const {
    RestElement,
    ObjectPattern,
    isIdentifier,
    ObjectProperty,
} = types;

module.exports.report = () => `Avoid useless 'forwardRef' in react > 19`;

module.exports.replace = () => ({
    'forwardRef(__a)': ({__a}) => {
        __a.params = buildParams(__a);
        
        return __a;
    },
});

function buildParams({params}) {
    const [props, ref] = params;
    const refProp = ObjectProperty(ref, ref);
    
    if (isIdentifier(props)) {
        const param = ObjectPattern([refProp, RestElement(props)]);
        
        return [param];
    }
    
    props.properties.unshift(refProp);
    
    return [props];
}
