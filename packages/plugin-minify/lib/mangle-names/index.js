'use strict';

const {entries} = Object;
const A = 97;

module.exports.report = () => `Mangle name`;

module.exports.include = () => [
    'BlockStatement',
];

module.exports.fix = ({scope}) => {
    for (const [name] of entries(scope.bindings)) {
        if (name.length === 1)
            continue;
        
        scope.rename(name, generateUid(name, scope));
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
