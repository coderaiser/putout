'use strict';

const {getExtends} = require('../get-extends');
const {getRules} = require('../get-rules');

module.exports.report = () => 'Use "putout/safe+align" instead of "putout/safe"';

module.exports.match = () => ({
    '__putout_processor_json(__a)': ({__a}) => {
        const elements = getExtends(__a);
        
        for (const {value} of elements) {
            if (value.includes('putout/safe+align'))
                return false;
            
            if (value.includes('putout/safe'))
                return true;
        }
        
        return false;
    },
});

function isRules(path) {
    return path.get('key').isStringLiteral({
        value: 'rules',
    });
}

module.exports.replace = () => ({
    '__putout_processor_json(__a)': ({__a}, path) => {
        const elements = getExtends(__a);
        const rules = getRules(__a);
        
        for (const element of elements) {
            const {value} = element;
            
            if (value.includes('putout/safe'))
                element.value = 'plugin:putout/safe+align';
        }
        
        for (const [i, rule] of rules.entries()) {
            const {key, value} = rule;
            
            if (key.value === 'putout/align-spaces' && value.value === 'error') {
                rules.splice(i, 1);
                break;
            }
        }
        
        const properties = path.get('arguments.0.properties');
        const rulesPath = properties.find(isRules);
        
        if (rulesPath && !rules.length)
            rulesPath.remove();
        
        return path;
    },
});

