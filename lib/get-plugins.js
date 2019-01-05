'use strict';

const {join} = require('path');
const addDir = (a) => join(__dirname, '..', 'lib', a);

const isDisabled = (a) => !a && typeof a === 'boolean';

module.exports = () => {
    const {
        plugins,
        rules,
    } = require('../putout.json');
    
    const result = [];
    for (const name of plugins) {
        console.log(name, rules[name]);
        
        if (isDisabled(rules[name])) {
            console.log('xxxx');
            continue;
        }
        
        const full = addDir(name);
        result.push(require(full));
    }
    
    return result;
};

