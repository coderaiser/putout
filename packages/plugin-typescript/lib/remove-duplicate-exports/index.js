'use strict';

const {operator} = require('putout');
const {remove} = operator;
const {entries} = Object;

module.exports.report = () => 'Avoid duplicate exports';

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    ExportNamedDeclaration(path) {
        const specs = path.get('specifiers');
        const map = {};
        
        for (const spec of specs) {
            const {local} = spec.node;
            
            if (!local)
                continue;
            
            const {name} = local;
            
            map[name] = map[name] || {
                count: 0,
                path: spec,
            };
            
            ++map[name].count;
        }
        
        for (const [, {path, count}] of entries(map)) {
            if (count === 1)
                continue;
            
            push(path);
        }
    },
});
