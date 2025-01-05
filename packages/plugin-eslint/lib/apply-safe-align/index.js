'use strict';

const {operator} = require('putout');
const {getRules, getExtends} = require('../get.js');

const {remove, __json} = operator;

module.exports.report = () => 'Use "putout/safe+align" instead of "putout/safe"';

module.exports.match = () => ({
    [__json]: ({__object}) => {
        const elements = getExtends(__object);
        
        for (const {value} of elements) {
            if (value.includes('putout/safe+align'))
                return false;
            
            if (value.includes('putout/safe'))
                return true;
        }
        
        return false;
    },
});

const isRules = (path) => path.get('key').isStringLiteral({
    value: 'rules',
});

module.exports.replace = () => ({
    [__json]: ({__object}, path) => {
        const elements = getExtends(__object);
        const rules = getRules(__object);
        
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
            remove(rulesPath);
        
        return path;
    },
});
