'use strict';

const {computeName} = require('./compute-name');
const {entries} = Object;

module.exports.report = () => `Mangle name`;

module.exports.include = () => [
    'Statement',
];

module.exports.fix = ({scope}) => {
    if (scope.__putout_minify)
        return;
    
    const all = scope.getAllBindings();
    
    for (const [name] of entries(scope.bindings)) {
        if (name.length === 1)
            continue;
        
        scope.rename(name, generateUid(name, all, scope));
    }
    
    scope.__putout_minify = true;
};

function generateUid(name, all, scope) {
    const uid = scope.generateUid();
    const short = computeName(uid);
    const dashed = `_${short}`;
    
    if (!all[short])
        return short;
    
    if (!all[dashed])
        return dashed;
    
    return uid;
}
