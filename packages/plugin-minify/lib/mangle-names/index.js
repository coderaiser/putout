'use strict';

const {computeName} = require('./compute-name');
const {keys} = Object;

module.exports.report = () => `Mangle name`;

module.exports.include = () => [
    'Statement',
];

module.exports.filter = (path) => !path.scope.__putout_minify;

module.exports.fix = ({scope}) => {
    const names = keys(scope.bindings);
    
    for (const [index, name] of names.entries()) {
        const all = scope.getAllBindings();
        
        if (name.length === 1)
            continue;
        
        const newName = generateUid({
            index,
            all,
            scope,
        });
        
        scope.rename(name, newName);
    }
    
    scope.__putout_minify = true;
};

function generateUid({index, all, scope}) {
    const uid = scope.generateUid();
    
    const short = computeName({
        index,
        all,
        uid,
    });
    
    return short;
}
