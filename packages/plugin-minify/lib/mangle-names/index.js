'use strict';

const {computeName} = require('./compute-name');
const {entries} = Object;

module.exports.report = () => `Mangle name`;

module.exports.include = () => ['Statement'];

module.exports.filter = (path) => !path.scope.__putout_minify;

module.exports.fix = ({scope}, options) => {
    const {mangleClassNames} = options;
    const names = entries(scope.bindings);
    
    for (const [index, [name, binding]] of names.entries()) {
        if (!mangleClassNames && binding.path.isClassDeclaration())
            continue;
        
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
