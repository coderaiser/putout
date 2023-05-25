'use strict';

const {entries} = Object;
const A = 97;

module.exports.report = () => `Mangle name`;

module.exports.include = () => [
    'Statement',
];

module.exports.fix = ({scope}) => {
    for (const [name, binding] of entries(scope.bindings)) {
        if (name.length === 1)
            continue;
        
        scope.rename(name, generateUid(name, scope));
        maybeFixObjectProperty(name, binding.path);
    }
};

function generateUid(name, scope) {
    const uid = scope.generateUid();
    const number = Number(uid.replace('_temp', '') || 0) + A;
    const short = String.fromCharCode(number);
    const dashed = `_${short}`;
    
    if (!scope.bindings[short])
        return short;
    
    if (!scope.bindings[dashed])
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
