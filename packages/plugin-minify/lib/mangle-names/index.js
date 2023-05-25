'use strict';

const {entries} = Object;
const A = 97;

module.exports.report = () => `Mangle name`;

module.exports.include = () => [
    'Statement',
];

module.exports.fix = ({scope}) => {
    if (scope.__putout_minify)
        return;
    
    const all = scope.getAllBindings();
    
    for (const [name, binding] of entries(scope.bindings)) {
        if (name.length === 1)
            continue;
        
        scope.rename(name, generateUid(name, all, scope));
        maybeFixObjectProperty(name, binding.path);
    }
    
    scope.__putout_minify = true;
};

function generateUid(name, all, scope) {
    const uid = scope.generateUid();
    const number = Number(uid.replace('_temp', '') || 0) + A;
    const short = String.fromCharCode(number);
    const dashed = `_${short}`;
    
    if (!all[short])
        return short;
    
    if (!all[dashed])
        return dashed;
    
    return uid;
}

function maybeFixObjectProperty(name, path) {
    path.traverse({
        ObjectProperty(path) {
            const {
                computed,
                shorthand,
                key,
            } = path.node;
            
            if (computed)
                return;
            
            if (!shorthand)
                return;
            
            if (name === key.name) {
                path.node.shorthand = false;
                path.stop();
            }
        },
    });
}
