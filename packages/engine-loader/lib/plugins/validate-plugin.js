const supportedKeys = [
    'find',
    'traverse',
    'replace',
    'include',
    'exclude',
    'rules',
    'declare',
    'scan',
];

export default ({plugin, rule}) => {
    const keys = Object.keys(plugin);
    
    for (const key of supportedKeys) {
        if (keys.includes(key))
            return;
    }
    
    throw Error(`☝️ Cannot determine type of plugin '${rule}'. Here is list of supported plugins: https://git.io/JqcMn`);
};
