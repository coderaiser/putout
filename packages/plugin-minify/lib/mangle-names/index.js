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
    
    scope.__putout_minify = true;
    const all = scope.getAllBindings();
    const names = entries(scope.bindings).flat();
    
    for (const [index, name] of names.entries()) {
        if (name.length === 1)
            continue;
        
        scope.rename(name, generateUid({
            all,
            scope,
            index,
        }));
    }
};

function generateUid({all, scope, index}) {
    const uid = scope.generateUid();
    const short = computeName(index, uid);
    const dashed = `_${short}`;
    
    if (!all[short])
        return short;
    
    if (!all[dashed])
        return dashed;
    
    return uid;
}
