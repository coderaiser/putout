'use strict';

const {types} = require('putout');
const {objectProperty, objectPattern} = types;
const COMPUTED = false;
const SHORTHAND = true;

module.exports.report = () => `Use 'externals({context, request}, callback){...}'`;

module.exports.match = () => ({
    'function externals(__args) {}': ({__args}) => __args.length === 3,
});

module.exports.replace = () => ({
    'function externals(__args) {}': ({__args}, path) => {
        const node = objectPattern([]);
        
        for (const [index, arg] of __args.entries()) {
            if (index === __args.length - 1)
                break;
            
            node.properties.push(objectProperty(arg, arg, COMPUTED, SHORTHAND));
        }
        
        const fn = path.node.params.pop();
        
        path.node.params = [node, fn];
        
        return path;
    },
});
