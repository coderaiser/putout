'use strict';

const supportedKeys = [
    'find',
    'traverse',
    'replace',
    'include',
    'exclude',
    'rules',
];

module.exports = ({plugin, rule}) => {
    const keys = Object.keys(plugin);
    
    for (const key of supportedKeys) {
        if (keys.includes(key))
            return;
    }
    
    throw Error(`☝️ Plugin "${rule}" type cannot be determined. Supported plugin types: https://git.io/JqcMn`);
};

